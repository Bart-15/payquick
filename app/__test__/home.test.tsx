import { render } from '@testing-library/react';

import Home from '../page';

describe('Home Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Home />);
    expect(baseElement).toBeTruthy();
  });
});
