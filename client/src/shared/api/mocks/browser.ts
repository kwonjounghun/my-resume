import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// API 모킹 활성화 여부 확인
const shouldEnableMocking = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';

// API 모킹이 활성화된 경우에만 worker 시작
export const initializeMocks = async () => {
  if (shouldEnableMocking) {
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
};
