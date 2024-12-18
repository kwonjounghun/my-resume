import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

describe('IntroductionController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;
  let createdIntroductionId: string;

  const testIntroduction = {
    title: 'E2E 테스트 자기소개',
    content: 'E2E 테스트 내용입니다.',
    userId: 'test-user-id',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    connection = moduleFixture.get(getConnectionToken());
    await app.init();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
    await app.close();
  });

  describe('/introduction (POST)', () => {
    it('새로운 자기소개를 생성해야 합니다', async () => {
      const response = await request(app.getHttpServer())
        .post('/introduction')
        .send(testIntroduction)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toBe(testIntroduction.title);
      expect(response.body.content).toBe(testIntroduction.content);
      expect(response.body.userId).toBe(testIntroduction.userId);

      createdIntroductionId = response.body._id;
    });
  });

  describe('/introduction (GET)', () => {
    it('사용자의 모든 자기소개를 조회해야 합니다', async () => {
      const response = await request(app.getHttpServer())
        .get('/introduction')
        .query({ userId: testIntroduction.userId })
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].title).toBe(testIntroduction.title);
    });
  });

  describe('/introduction/:id (GET)', () => {
    it('특정 자기소개를 조회해야 합니다', async () => {
      const response = await request(app.getHttpServer())
        .get(`/introduction/${createdIntroductionId}`)
        .expect(200);

      expect(response.body._id).toBe(createdIntroductionId);
      expect(response.body.title).toBe(testIntroduction.title);
    });

    it('존재하지 않는 자기소개를 조회할 경우 404를 반환해야 합니다', async () => {
      await request(app.getHttpServer())
        .get('/introduction/nonexistent-id')
        .expect(404);
    });
  });

  describe('/introduction/:id (PATCH)', () => {
    it('자기소개를 수정해야 합니다', async () => {
      const updateData = {
        title: '수정된 E2E 테스트 자기소개',
      };

      const response = await request(app.getHttpServer())
        .patch(`/introduction/${createdIntroductionId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.title).toBe(updateData.title);
      expect(response.body.content).toBe(testIntroduction.content);
    });

    it('존재하지 않는 자기소개를 수정할 경우 404를 반환해야 합니다', async () => {
      await request(app.getHttpServer())
        .patch('/introduction/nonexistent-id')
        .send({ title: '수정된 제목' })
        .expect(404);
    });
  });

  describe('/introduction/:id (DELETE)', () => {
    it('자기소개를 삭제해야 합니다', async () => {
      await request(app.getHttpServer())
        .delete(`/introduction/${createdIntroductionId}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/introduction/${createdIntroductionId}`)
        .expect(404);
    });

    it('존재하지 않는 자기소개를 삭제할 경우 404를 반환해야 합니다', async () => {
      await request(app.getHttpServer())
        .delete('/introduction/nonexistent-id')
        .expect(404);
    });
  });
}); 