import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RetrospectiveService } from './retrospective.service';
import { CreateRetrospectiveDto } from './dto/create-retrospective.dto';
import { UpdateRetrospectiveDto } from './dto/update-retrospective.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('retrospectives')
@UseGuards(AuthGuard('jwt'))
export class RetrospectiveController {
  constructor(private readonly retrospectiveService: RetrospectiveService) { }

  @Post()
  create(@Body() createRetrospectiveDto: CreateRetrospectiveDto, @Req() req) {
    return this.retrospectiveService.create(createRetrospectiveDto, req.user.id);
  }

  @Get()
  findAll(@Req() req) {
    return this.retrospectiveService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.retrospectiveService.findOne(id, req.user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRetrospectiveDto: UpdateRetrospectiveDto,
    @Req() req,
  ) {
    return this.retrospectiveService.update(id, updateRetrospectiveDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.retrospectiveService.remove(id, req.user.id);
  }

  @Post(':id/summarize')
  summarize(@Param('id') id: string, @Req() req) {
    return this.retrospectiveService.summarize(id, req.user.id);
  }
} 