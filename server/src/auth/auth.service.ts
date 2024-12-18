import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) { }

  async googleLogin(user: UserDocument) {
    const payload = {
      email: user.email,
      sub: user._id,
      name: user.name,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
    };
  }

  async validateUser(userDetails: any): Promise<UserDocument> {
    const { email, googleId } = userDetails;

    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { googleId }],
    });

    if (existingUser) {
      // 마지막 로그인 시간 업데이트
      existingUser.lastLogin = new Date();
      await existingUser.save();
      return existingUser;
    }

    // 새 사용자 생성
    const newUser = new this.userModel(userDetails);
    return newUser.save();
  }

  async findUserById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async login(user: UserDocument) {
    const payload = {
      email: user.email,
      sub: user._id,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
    };
  }
} 