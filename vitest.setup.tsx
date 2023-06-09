// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import matchers from '@testing-library/jest-dom/matchers';
import {cleanup} from '@testing-library/react';
import {afterEach, expect, vi} from 'vitest';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

afterEach(() => {
  cleanup();
});

vi.mock('antd', async () => {
  const actual: object = await vi.importActual("antd")
  return {
    ...actual,
    Row: ({ children }: any) => <div>{children}</div>,
    Table: ({ children }: any) => <div>{children}</div>,
  }
});
