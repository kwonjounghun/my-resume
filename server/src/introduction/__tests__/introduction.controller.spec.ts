import { Test, TestingModule } from '@nestjs/testing';
import { IntroductionController } from '../introduction.controller';
import { IntroductionService } from '../introduction.service';
import { CreateIntroductionDto } from '../dto/create-introduction.dto';
import { UpdateIntroductionDto } from '../dto/update-introduction.dto';

describe('IntroductionController', () => {
  let controller: IntroductionController;
  let service: IntroductionService;

  const mockIntroduction = {
    _id: 'test-id',
    title: '테스트 자기소개',
    content: '테스트 내용입니다.',
    userId: 'test-user-id',
  };

  const mockIntroductionService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntroductionController],
      providers: [
        {
          provide: IntroductionService,
          useValue: mockIntroductionService,
        },
      ],
    }).compile();

    controller = module.get<IntroductionController>(IntroductionController);
    service = module.get<IntroductionService>(IntroductionService);
  });

  describe('create', () => {
    it('새로운 자기소개를 생성해야 합니다', async () => {
      const createDto: CreateIntroductionDto = {
        title: '테스트 자기소개',
        content: '테스트 내용입니다.',
        userId: 'test-user-id',
      };

      mockIntroductionService.create.mockResolvedValue(mockIntroduction);

      const result = await controller.create(createDto);
      expect(result).toEqual(mockIntroduction);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('사용자의 모든 자기소개를 조회해야 합니다', async () => {
      const userId = 'test-user-id';
      mockIntroductionService.findAll.mockResolvedValue([mockIntroduction]);

      const result = await controller.findAll(userId);
      expect(result).toEqual([mockIntroduction]);
      expect(service.findAll).toHaveBeenCalledWith(userId);
    });
  });

  describe('findOne', () => {
    it('특정 자기소개를 조회해야 합니다', async () => {
      const id = 'test-id';
      mockIntroductionService.findOne.mockResolvedValue(mockIntroduction);

      const result = await controller.findOne(id);
      expect(result).toEqual(mockIntroduction);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('자기소개를 수정해야 합니다', async () => {
      const id = 'test-id';
      const updateDto: UpdateIntroductionDto = {
        title: '수정된 자기소개',
      };

      mockIntroductionService.update.mockResolvedValue({
        ...mockIntroduction,
        ...updateDto,
      });

      const result = await controller.update(id, updateDto);
      expect(result).toEqual({
        ...mockIntroduction,
        ...updateDto,
      });
      expect(service.update).toHaveBeenCalledWith(id, updateDto);
    });
  });

  describe('remove', () => {
    it('자기소개를 삭제해야 합니다', async () => {
      const id = 'test-id';
      mockIntroductionService.remove.mockResolvedValue(undefined);

      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
}); 