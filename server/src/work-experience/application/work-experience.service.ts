import { Injectable, Inject } from '@nestjs/common';
import { WorkExperienceRepository, WORK_EXPERIENCE_REPOSITORY } from '../domain/work-experience.repository';
import { CreateWorkExperienceDto } from '../interface/dto/create-work-experience.dto';
import { UpdateWorkExperienceDto } from '../interface/dto/update-work-experience.dto';

@Injectable()
export class WorkExperienceService {
  constructor(
    @Inject(WORK_EXPERIENCE_REPOSITORY)
    private readonly workExperienceRepository: WorkExperienceRepository,
  ) { }

  create(createWorkExperienceDto: CreateWorkExperienceDto, userId: string) {
    return this.workExperienceRepository.create({
      ...createWorkExperienceDto,
      userId,
    });
  }

  findAll(userId: string) {
    return this.workExperienceRepository.findAll(userId);
  }

  findOne(id: string, userId: string) {
    return this.workExperienceRepository.findOne(id, userId);
  }

  update(id: string, updateWorkExperienceDto: UpdateWorkExperienceDto, userId: string) {
    return this.workExperienceRepository.update(id, updateWorkExperienceDto, userId);
  }

  remove(id: string, userId: string) {
    return this.workExperienceRepository.remove(id, userId);
  }
} 