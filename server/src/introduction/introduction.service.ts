import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIntroductionDto } from './dto/create-introduction.dto';
import { UpdateIntroductionDto } from './dto/update-introduction.dto';
import { Introduction, IntroductionDocument } from './schemas/introduction.schema';

@Injectable()
export class IntroductionService {
  constructor(
    @InjectModel(Introduction.name)
    private introductionModel: Model<IntroductionDocument>,
  ) { }

  async create(createIntroductionDto: CreateIntroductionDto, userId: string) {
    const created = await this.introductionModel.create({
      ...createIntroductionDto,
      userId,
    });
    return created;
  }

  async findAll(userId: string) {
    const introductions = await this.introductionModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .exec();

    return { introductions: introductions.map((introduction) => ({ ...introduction.toObject(), id: introduction._id.toString() })), total: introductions.length };
  }

  async findOne(id: string, userId: string) {
    const introduction = await this.introductionModel.findOne({
      _id: id,
      userId,
    });

    if (!introduction) {
      throw new NotFoundException('자기소개를 찾을 수 없습니다.');
    }

    return { ...introduction.toObject(), id: introduction._id.toString() };
  }

  async update(id: string, updateIntroductionDto: UpdateIntroductionDto, userId: string) {
    const introduction = await this.introductionModel.findOneAndUpdate(
      { _id: id, userId },
      updateIntroductionDto,
      { new: true },
    );

    if (!introduction) {
      throw new NotFoundException('자기소개를 찾을 수 없습니다.');
    }

    return { ...introduction.toObject(), id: introduction._id.toString() };
  }

  async remove(id: string, userId: string) {
    const introduction = await this.introductionModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!introduction) {
      throw new NotFoundException('자기소개를 찾을 수 없습니다.');
    }

    return { ...introduction.toObject(), id: introduction._id.toString() };
  }
} 