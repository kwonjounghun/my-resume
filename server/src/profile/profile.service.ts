import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './profile.schema';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) { }

  async create(userId: string, createProfileDto: CreateProfileDto): Promise<Profile> {
    const existingProfile = await this.profileModel.findOne({ _id: userId });
    if (existingProfile) {
      throw new Error('Profile already exists for this user');
    }

    const profile = new this.profileModel({
      userId,
      ...createProfileDto,
    });
    return profile.save();
  }

  async findByUserId(userId: string): Promise<Profile> {
    const profile = (await this.profileModel.findOne({ _id: userId })).toObject();
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    profile.id = profile._id.toString();
    return profile;
  }

  async update(userId: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    const profile = await this.profileModel.findOneAndUpdate(
      { _id: userId },
      { $set: updateProfileDto },
    );

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async delete(userId: string): Promise<void> {
    const result = await this.profileModel.deleteOne({ _id: userId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Profile not found');
    }
  }
} 