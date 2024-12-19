import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { IntroductionService } from './introduction.service';
import { CreateIntroductionDto } from './dto/create-introduction.dto';
import { UpdateIntroductionDto } from './dto/update-introduction.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('introductions')
@UseGuards(AuthGuard('jwt'))
export class IntroductionController {
  constructor(private readonly introductionService: IntroductionService) { }

  @Post()
  create(@Body() createIntroductionDto: CreateIntroductionDto, @Req() req) {
    return this.introductionService.create(createIntroductionDto, req.user.id);
  }

  @Get()
  findAll(@Req() req) {
    return this.introductionService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.introductionService.findOne(id, req.user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateIntroductionDto: UpdateIntroductionDto,
    @Req() req,
  ) {
    return this.introductionService.update(id, updateIntroductionDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.introductionService.remove(id, req.user.id);
  }
} 