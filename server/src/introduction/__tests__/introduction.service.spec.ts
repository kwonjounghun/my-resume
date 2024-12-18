import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IntroductionService } from '../introduction.service';
import { Introduction, IntroductionDocument } from '../schemas/introduction.schema';
import { CreateIntroductionDto } from '../dto/create-introduction.dto';
import { UpdateIntroductionDto } from '../dto/update-introduction.dto';
import { NotFoundException } from '@nestjs/common';

describe('IntroductionService', () => {
  let service: IntroductionService;
  let model: Model<IntroductionDocument>;

  const mockIntroduction = {
    _id: 'test-id',
    title: '테스트 자기소개',
    content: '테스트 내용입니다.',
    userId: 'test-user-id',
  };

  const mockIntroductionModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
    save: jest.fn(),
    exec: jest.fn(),
    new: jest.fn().mockResolvedValue(mockIntroduction),
    constructor: jest.fn().mockResolvedValue(mockIntroduction),
    prototype: {
      save: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntroductionService,
        {
          provide: getModelToken(Introduction.name),
          useValue: mockIntroductionModel,
        },
      ],
    }).compile();

    service = module.get<IntroductionService>(IntroductionService);
    model = module.get<Model<IntroductionDocument>>(
      getModelToken(Introduction.name),
    );
  });

  describe('create', () => {
    it('자기소개를 생성해야 합니다', async () => {
      const createDto: CreateIntroductionDto = {
        title: '테스트 자기소개',
        content: '테스트 내용입니다.',
        userId: 'test-user-id',
      };

      mockIntroductionModel.create.mockResolvedValue(mockIntroduction);

      const result = await service.create(createDto);
      expect(result).toEqual(mockIntroduction);
    });
  });

  describe('findAll', () => {
    it('사용자의 모든 자기소개를 조회해야 합니다', async () => {
      const userId = 'test-user-id';
      mockIntroductionModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([mockIntroduction]),
      });

      const result = await service.findAll(userId);
      expect(result).toEqual([mockIntroduction]);
      expect(model.find).toHaveBeenCalledWith({ userId });
    });
  });

  describe('findOne', () => {
    it('특정 자기소개를 조회해야 합니다', async () => {
      const id = 'test-id';
      mockIntroductionModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockIntroduction),
      });

      const result = await service.findOne(id);
      expect(result).toEqual(mockIntroduction);
      expect(model.findById).toHaveBeenCalledWith(id);
    });

    it('존재하지 않는 자기소개를 조회할 경우 NotFoundException을 던져야 합니다', async () => {
      const id = 'nonexistent-id';
      mockIntroductionModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('자기소개를 수정해야 합니다', async () => {
      const id = 'test-id';
      const updateDto: UpdateIntroductionDto = {
        title: '수정된 자기소개',
      };

      mockIntroductionModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          ...mockIntroduction,
          ...updateDto,
        }),
      });

      const result = await service.update(id, updateDto);
      expect(result).toEqual({
        ...mockIntroduction,
        ...updateDto,
      });
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        updateDto,
        { new: true },
      );
    });

    it('존재하지 않는 자기소개를 수정할 경우 NotFoundException을 던져야 합니다', async () => {
      const id = 'nonexistent-id';
      const updateDto: UpdateIntroductionDto = {
        title: '수정된 자기소개',
      };

      mockIntroductionModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.update(id, updateDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('자기소��를 삭제해야 합니다', async () => {
      const id = 'test-id';
      mockIntroductionModel.deleteOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      });

      await service.remove(id);
      expect(model.deleteOne).toHaveBeenCalledWith({ _id: id });
    });

    it('존재하지 않는 자기소개를 삭제할 경우 NotFoundException을 던져야 합니다', async () => {
      const id = 'nonexistent-id';
      mockIntroductionModel.deleteOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 0 }),
      });

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
}); 