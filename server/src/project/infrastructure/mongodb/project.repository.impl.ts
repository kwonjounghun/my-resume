import { Injectable } from '@nestjs/common';
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
      projects: projects.map(project => new Project(project)),
      total,
    };
  }
} 