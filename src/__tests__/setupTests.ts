// Extend Vitest "expect" functionality with Testing Library assertions.
import '@testing-library/jest-dom/vitest';

import { server } from './mock-server.js';

beforeAll(() =>
  server.listen({
    onUnhandledRequest(request) {
      console.warn(
        'You are directly calling an API in your test. Consider mocking the request! The unhandled call is %s %s',
        request.method,
        request.url
      );
    },
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
