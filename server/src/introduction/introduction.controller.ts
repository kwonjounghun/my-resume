import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { IntroductionService } from './introduction.service';
import { CreateIntroductionDto } from './dto/create-introduction.dto';
import { UpdateIntroductionDto } from './dto/update-introduction.dto';

@Controller('introductions')
export class IntroductionController {
  constructor(private readonly introductionService: IntroductionService) { }

  @Post()
  create(@Body() createIntroductionDto: CreateIntroductionDto) {
    return this.introductionService.create(createIntroductionDto);
  }

  @Get()
  async findAll(@Query('userId') userId: string) {
    const introductions = await this.introductionService.findAll(userId);
    return { introductions, total: introductions.length };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.introductionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIntroductionDto: UpdateIntroductionDto,
  ) {
    return this.introductionService.update(id, updateIntroductionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.introductionService.remove(id);
  }
} 