import '@testing-library/jest-dom';
import { worker } from './src/mocks/browser';

beforeAll(() => {
  worker.start();
});

afterEach(() => {
  worker.resetHandlers();
});

afterAll(() => {
  worker.stop();
});
