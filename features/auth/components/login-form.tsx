'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@shared/components/ui/button';
import { Input } from '@shared/components/ui/input';
import { FormProvider, useForm } from 'react-hook-form';

import { useLoginMutation } from '../hooks/useLoginMutation';
import { loginValidationSchema } from '../validations/login.validation';
import { LoginFormData } from '../validations/login.validation';

const LoginForm = () => {
  const loginMutation = useLoginMutation();
  const methods = useForm<LoginFormData>({
    mode: 'all',
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await loginMutation.mutateAsync(data);
  };

  return (
    <div className="mx-auto w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
      <h1 className="mb-4 text-center text-2xl font-bold">Login</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            type="email"
            id="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
          />

          <Button type="submit" className="w-full" aria-label="Login">
            Login
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
