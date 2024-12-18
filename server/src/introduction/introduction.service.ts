import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateIntroductionDto } from './dto/create-introduction.dto';
import { UpdateIntroductionDto } from './dto/update-introduction.dto';
import { Introduction, IntroductionDocument } from './schemas/introduction.schema';

@Injectable()
export class IntroductionService {
  constructor(
    @InjectModel(Introduction.name)
    private introductionModel: Model<IntroductionDocument>,
  ) {}

  async create(createIntroductionDto: CreateIntroductionDto): Promise<Introduction> {
    return this.introductionModel.create(createIntroductionDto);
  }

  async findAll(userId: string): Promise<Introduction[]> {
    return this.introductionModel.find({ userId }).exec();
  }

  async findOne(id: string): Promise<Introduction> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`Introduction with ID ${id} not found`);
    }
    const introduction = await this.introductionModel.findById(id).exec();
    if (!introduction) {
      throw new NotFoundException(`Introduction with ID ${id} not found`);
    }
    return introduction;
  }

  async update(id: string, updateIntroductionDto: UpdateIntroductionDto): Promise<Introduction> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`Introduction with ID ${id} not found`);
    }
    const updatedIntroduction = await this.introductionModel
      .findByIdAndUpdate(id, updateIntroductionDto, { new: true })
      .exec();
    if (!updatedIntroduction) {
      throw new NotFoundException(`Introduction with ID ${id} not found`);
    }
    return updatedIntroduction;
  }

  async remove(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`Introduction with ID ${id} not found`);
    }
    const result = await this.introductionModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Introduction with ID ${id} not found`);
    }
  }
} 