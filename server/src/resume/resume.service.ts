import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Resume, ResumeDocument } from './schemas/resume.schema';

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(Resume.name)
    private resumeModel: Model<ResumeDocument>,
  ) {}

  async create(createResumeDto: CreateResumeDto, userId: string) {
    const created = await this.resumeModel.create({
      ...createResumeDto,
      userId,
    });
    return created;
  }

  async findAll(userId: string) {
    const resumes = await this.resumeModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .exec();

    return { resumes: resumes.map((resume) => ({ ...resume.toObject(), id: resume._id.toString() })), total: resumes.length };
  }

  async findOne(id: string, userId: string) {
    const resume = await this.resumeModel.findOne({
      _id: id,
      userId,
    });

    if (!resume) {
      throw new NotFoundException('이력서를 찾을 수 없습니다.');
    }

    return { ...resume.toObject(), id: resume._id.toString() };
  }

  async update(id: string, updateResumeDto: UpdateResumeDto, userId: string) {
    const resume = await this.resumeModel.findOneAndUpdate(
      { _id: id, userId },
      updateResumeDto,
      { new: true },
    );

    if (!resume) {
      throw new NotFoundException('이력서를 찾을 수 없습니다.');
    }

    return { ...resume.toObject(), id: resume._id.toString() };
  }

  async remove(id: string, userId: string) {
    const resume = await this.resumeModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!resume) {
      throw new NotFoundException('이력서를 찾을 수 없습니다.');
    }

    return { ...resume.toObject(), id: resume._id.toString() };
  }
} 