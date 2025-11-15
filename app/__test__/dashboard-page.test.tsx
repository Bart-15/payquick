import '@/shared/testing/__mocks__/navigation';

import { render } from '@testing-library/react';

import {
  createAuthProviderWrapper,
  createComposedWrapper,
  createQueryClientWrapper,
} from '@/shared/testing/wrappers/test-wrappers';

import DashboardPage from '../dashboard/page';

const wrapper = createComposedWrapper([
  createAuthProviderWrapper(),
  createQueryClientWrapper(),
]);

describe('Dashboard Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardPage />, { wrapper });
    expect(baseElement).toBeTruthy();
  });
});
