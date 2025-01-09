import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectRepository } from '../../domain/project.repository';
import { Project } from '../../domain/project.entity';
import { ProjectDocument } from './project.schema';

@Injectable()
export class ProjectRepositoryImpl implements ProjectRepository {
  constructor(
    @InjectModel(ProjectDocument.name)
    private projectModel: Model<ProjectDocument>,
  ) { }

  private toEntity(doc: ProjectDocument): Project {
    const { _id, ...rest } = doc.toObject();
    return new Project({
      id: _id.toString(),
      ...rest,
    });
  }

  async create(project: Project): Promise<Project> {
    const created = await this.projectModel.create(project);
    return this.toEntity(created);
  }

  async findById(id: string, userId: string): Promise<Project> {
    const project = await this.projectModel.findOne({ _id: id, userId }).exec();
    return project ? this.toEntity(project) : null;
  }

  async update(id: string, project: Partial<Project>, userId: string): Promise<Project> {
    const updated = await this.projectModel
      .findOneAndUpdate(
        { _id: id, userId },
        { $set: project },
        { new: true }
      )
      .exec();
    return updated ? this.toEntity(updated) : null;
  }

  async delete(id: string, userId: string): Promise<Project> {
    const deleted = await this.projectModel
      .findOneAndDelete({ _id: id, userId })
      .exec();
    return deleted ? this.toEntity(deleted) : null;
  }

  async findAll(params: {
    userId: string;
    page?: number;
    limit?: number;
    keyword?: string;
    sortBy?: 'startDate' | 'endDate' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
  }): Promise<{ projects: Project[]; total: number }> {
    const { userId, page = 1, limit = 10, keyword, sortBy = 'createdAt', sortOrder = 'desc' } = params;

    const query = this.projectModel.find({ userId });

    if (keyword) {
      query.or([
        { title: { $regex: keyword, $options: 'i' } },
        { companyName: { $regex: keyword, $options: 'i' } },
      ]);
    }

    const total = await this.projectModel.countDocuments(query.getQuery());

    const projects = await query
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      projects: projects.map(project => this.toEntity(project)),
      total,
    };
  }
} 