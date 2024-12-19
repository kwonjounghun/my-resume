import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<CompanyDocument>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, userId: string) {
    const created = await this.companyModel.create({
      ...createCompanyDto,
      userId,
    });
    return created;
  }

  async findAll(userId: string) {
    const companies = await this.companyModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .exec();

    return { companies: companies.map((company) => ({ ...company.toObject(), id: company._id.toString() })), total: companies.length };
  }

  async findOne(id: string, userId: string) {
    const company = await this.companyModel.findOne({
      _id: id,
      userId,
    });

    if (!company) {
      throw new NotFoundException('관심 기업을 찾을 수 없습니다.');
    }

    return { ...company.toObject(), id: company._id.toString() };
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, userId: string) {
    const company = await this.companyModel.findOneAndUpdate(
      { _id: id, userId },
      updateCompanyDto,
      { new: true },
    );

    if (!company) {
      throw new NotFoundException('관심 기업을 찾을 수 없습니다.');
    }

    return { ...company.toObject(), id: company._id.toString() };
  }

  async remove(id: string, userId: string) {
    const company = await this.companyModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!company) {
      throw new NotFoundException('관심 기업을 찾을 수 없습니다.');
    }

    return { ...company.toObject(), id: company._id.toString() };
  }
} 