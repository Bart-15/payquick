jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    pathname: '/',
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));

// Re-export for convenience
export const useRouter = jest.requireMock('next/navigation').useRouter;
export const usePathname = jest.requireMock('next/navigation').usePathname;
export const useSearchParams =
  jest.requireMock('next/navigation').useSearchParams;

export const useParams = jest.requireMock('next/navigation').useParams;
