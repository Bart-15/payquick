/* eslint-disable @typescript-eslint/no-require-imports */
// jest.polyfills.js

const { TextDecoder, TextEncoder } = require('node:util');

const {
  ReadableStream,
  TransformStream,
  WritableStream,
} = require('node:stream/web');

const { BroadcastChannel } = require('node:worker_threads');

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream },
  TransformStream: { value: TransformStream },
  WritableStream: { value: WritableStream },
  BroadcastChannel: { value: BroadcastChannel },
});
