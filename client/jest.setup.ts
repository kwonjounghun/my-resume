import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { matchers } from '@emotion/jest';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// MSW 설정
const { Response, Request, Headers, fetch } = require('whatwg-fetch');
global.Response = Response;
global.Request = Request;
global.Headers = Headers;
global.fetch = fetch;

// BroadcastChannel Mock
class BroadcastChannelMock {
  name: string | null = null;

  constructor() {
    this.name = null;
  }

  postMessage() { }
  addEventListener() { }
  removeEventListener() { }
  close() { }
}

global.BroadcastChannel = BroadcastChannelMock as any;

expect.extend(matchers);
