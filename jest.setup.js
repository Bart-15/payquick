// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'whatwg-fetch';

import { server } from './mocks/server';

// Set environment variables for tests
process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000';
process.env.NEXT_PUBLIC_API_VERSION = 'api/v1';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Start API mocking before all tests
beforeAll(() => server.listen());
// Reset handlers after each test
afterEach(() => server.resetHandlers());
// Clean up after tests
afterAll(() => server.close());
