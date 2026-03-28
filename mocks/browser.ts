import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

// Create a Service Worker for the browser
export const worker = setupWorker(...handlers);
