import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDocument } from './project.schema';
import { ProjectRepository } from '../../domain/project.repository';
import { Project } from '../../domain/project.entity';

@Injectable()
export class ProjectRepositoryImpl implements ProjectRepository {
  constructor(
    @InjectModel(ProjectDocument.name)
    private projectModel: Model<ProjectDocument>,
  ) { }

  async create(project: Project): Promise<Project> {
    const created = await this.projectModel.create(project);
    return new Project({ ...created.toObject(), id: created._id.toString() });
  }

  async findAll(params: {
    userId: string;
    page?: number;
    limit?: number;
    keyword?: string;
    sortBy?: 'startDate' | 'endDate' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
  }): Promise<{ projects: Project[]; total: number }> {
    const {
      userId,
      page = 1,
      limit = 10,
      keyword,
      sortBy = 'startDate',
      sortOrder = 'desc',
    } = params;

    const query: any = { userId };

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { keywords: { $in: [new RegExp(keyword, 'i')] } },
      ];
    }

    const [projects, total] = await Promise.all([
      this.projectModel
        .find(query)
        .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.projectModel.countDocuments(query),
    ]);

    return {
      projects: projects.map(project => new Project({ ...project, id: project._id.toString() })),
      total,
    };
  }

  async findById(id: string, userId: string): Promise<Project> {
    const project = await this.projectModel.findOne({ _id: id, userId }).lean();

    if (!project) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다.');
    }

    return new Project({ ...project, id: project._id.toString() });
  }

  async update(id: string, project: Partial<ProjectDocument>, userId: string): Promise<Project> {
    const updated = await this.projectModel.findOneAndUpdate(
      { _id: id, userId },
      { ...project, updatedAt: new Date() },
      { new: true },
    ).lean();

    if (!updated) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다.');
    }

    return new Project({ ...updated, id: updated._id.toString() });
  }
} 