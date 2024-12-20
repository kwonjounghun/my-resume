import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// MSW 설정
const { Response, Request, Headers, fetch } = require('whatwg-fetch');
global.Response = Response;
global.Request = Request;
global.Headers = Headers;
global.fetch = fetch;

// BroadcastChannel Mock
class BroadcastChannelMock {
  constructor() {
    this.name = null;
  }

  postMessage() {}
  addEventListener() {}
  removeEventListener() {}
  close() {}
}

global.BroadcastChannel = BroadcastChannelMock;
