import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('profiles')
@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Post()
  @ApiOperation({ summary: '기본정보 생성' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '기본정보가 성공적으로 생성되었습니다.',
  })
  async create(@User('id') userId: string, @Body() createProfileDto: CreateProfileDto) {
    return {
      profile: await this.profileService.create(userId, createProfileDto),
    };
  }

  @Get()
  @ApiOperation({ summary: '기본정보 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '기본정보를 성공적으로 조회했습니다.',
  })
  async findOne(@User('id') userId: string) {
    return {
      profile: await this.profileService.findByUserId(userId),
    };
  }

  @Put()
  @ApiOperation({ summary: '기본정보 수정' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '기본정보가 성공적으로 수정되었습니다.',
  })
  async update(
    @User('id') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return {
      profile: await this.profileService.update(userId, updateProfileDto),
    };
  }

  @Delete()
  @ApiOperation({ summary: '기본정보 삭제' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: '기본정보가 성공적으로 삭제되었습니다.',
  })
  async remove(@User('id') userId: string) {
    await this.profileService.delete(userId);
  }
} 