export type LoginResponse = {
  status: 'success' | 'error';
  message: string;
  data: LoginData;
};

export type LoginData = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user: LoginUser;
};

export type LoginUser = {
  user_id: string;
  full_name: string;
  email: string;
};
