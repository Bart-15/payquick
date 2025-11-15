import '@/shared/testing/__mocks__/navigation';

import { render } from '@testing-library/react';

import {
  createAuthProviderWrapper,
  createComposedWrapper,
  createQueryClientWrapper,
} from '@/shared/testing/wrappers/test-wrappers';

import LoginPage from '../login/page';

const wrapper = createComposedWrapper([
  createAuthProviderWrapper(),
  createQueryClientWrapper(),
]);

describe('Login Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoginPage />, { wrapper });
    expect(baseElement).toBeTruthy();
  });
});
