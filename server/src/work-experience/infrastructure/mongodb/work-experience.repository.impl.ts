import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkExperienceDocument } from './work-experience.schema';
import { WorkExperienceRepository } from '../../domain/work-experience.repository';
import { WorkExperience } from '../../domain/work-experience.entity';

@Injectable()
export class WorkExperienceRepositoryImpl implements WorkExperienceRepository {
  constructor(
    @InjectModel(WorkExperienceDocument.name)
    private workExperienceModel: Model<WorkExperienceDocument>,
  ) { }

  async create(workExperience: Partial<WorkExperience>): Promise<WorkExperience> {
    const created = await this.workExperienceModel.create(workExperience);
    return new WorkExperience({ ...created.toObject(), id: created._id.toString() });
  }

  async findAll(userId: string): Promise<{ workExperiences: WorkExperience[]; total: number }> {
    const workExperiences = await this.workExperienceModel
      .find({ userId })
      .sort({ startDate: -1 })
      .exec();

    return {
      workExperiences: workExperiences.map(
        (workExperience) =>
          new WorkExperience({
            ...workExperience.toObject(),
            id: workExperience._id.toString(),
          }),
      ),
      total: workExperiences.length,
    };
  }

  async findOne(id: string, userId: string): Promise<WorkExperience> {
    const workExperience = await this.workExperienceModel.findOne({
      _id: id,
      userId,
    });

    if (!workExperience) {
      throw new NotFoundException('경력 정보를 찾을 수 없습니다.');
    }

    return new WorkExperience({
      ...workExperience.toObject(),
      id: workExperience._id.toString(),
    });
  }

  async update(
    id: string,
    workExperience: Partial<WorkExperience>,
    userId: string,
  ): Promise<WorkExperience> {
    const updated = await this.workExperienceModel.findOneAndUpdate(
      { _id: id, userId },
      workExperience,
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('경력 정보를 찾을 수 없습니다.');
    }

    return new WorkExperience({
      ...updated.toObject(),
      id: updated._id.toString(),
    });
  }

  async remove(id: string, userId: string): Promise<WorkExperience> {
    const deleted = await this.workExperienceModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!deleted) {
      throw new NotFoundException('경력 정보를 찾을 수 없습니다.');
    }

    return new WorkExperience({
      ...deleted.toObject(),
      id: deleted._id.toString(),
    });
  }
} 