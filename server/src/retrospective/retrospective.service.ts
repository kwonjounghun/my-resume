import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRetrospectiveDto } from './dto/create-retrospective.dto';
import { UpdateRetrospectiveDto } from './dto/update-retrospective.dto';
import { Retrospective, RetrospectiveDocument } from './schemas/retrospective.schema';
import { OpenAIService } from '../common/services/openai.service';

@Injectable()
export class RetrospectiveService {
  constructor(
    @InjectModel(Retrospective.name)
    private retrospectiveModel: Model<RetrospectiveDocument>,
    private openAIService: OpenAIService,
  ) { }

  async create(createRetrospectiveDto: CreateRetrospectiveDto, userId: string) {
    const created = await this.retrospectiveModel.create({
      ...createRetrospectiveDto,
      userId,
    });
    return created;
  }

  async findAll(userId: string) {
    const retrospectives = await this.retrospectiveModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .exec();

    return { retrospectives: retrospectives.map((retrospective) => ({ ...retrospective.toObject(), id: retrospective._id.toString() })), total: retrospectives.length };
  }

  async findOne(id: string, userId: string) {
    const retrospective = await this.retrospectiveModel.findOne({
      _id: id,
      userId,
    });

    if (!retrospective) {
      throw new NotFoundException('회고를 찾을 수 없습니다.');
    }

    return { ...retrospective.toObject(), id: retrospective._id.toString() };
  }

  async update(id: string, updateRetrospectiveDto: UpdateRetrospectiveDto, userId: string) {
    const retrospective = await this.retrospectiveModel.findOneAndUpdate(
      { _id: id, userId },
      updateRetrospectiveDto,
      { new: true },
    );

    if (!retrospective) {
      throw new NotFoundException('회고를 찾을 수 없습니다.');
    }

    return { ...retrospective.toObject(), id: retrospective._id.toString() };
  }

  async remove(id: string, userId: string) {
    const retrospective = await this.retrospectiveModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!retrospective) {
      throw new NotFoundException('회고를 찾을 수 없습니다.');
    }

    return { ...retrospective.toObject(), id: retrospective._id.toString() };
  }

  async summarize(id: string, userId: string) {
    const retrospective = await this.findOne(id, userId);

    if (!retrospective.situation || !retrospective.task || !retrospective.action || !retrospective.result) {
      throw new UnauthorizedException('STAR 내용이 모두 작성되어야 요약할 수 있습니다.');
    }

    if (retrospective.summary) {
      throw new UnauthorizedException('이미 요약이 작성되어 있습니다.');
    }

    try {
      const { summary, keywords } = await this.openAIService.summarizeRetrospective(
        retrospective.situation,
        retrospective.task,
        retrospective.action,
        retrospective.result,
      );

      const updated = await this.retrospectiveModel.findOneAndUpdate(
        { _id: id, userId },
        { summary, keywords },
        { new: true },
      );

      if (!updated) {
        throw new NotFoundException('회고를 찾을 수 없습니다.');
      }

      return { ...updated.toObject(), id: updated._id.toString() };
    } catch (error) {
      console.error('Summarize Error:', error);
      throw new Error('회고 요약 생성에 실패했습니다.');
    }
  }
} 