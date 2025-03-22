'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginWithPasswordAction } from '@/services/loginWithPassword';
import { useRouter } from 'next/navigation';

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

const LoginWithPassword = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    if (errors) {
      console.error(errors);
    }

    const res = await loginWithPasswordAction(data);

    if (res?.validationErrors) {
      // Alert user that there is an error, error logging, or restart form
      console.error(res.validationErrors);
    }

    // Redirect to secure page
    router.push('/secure');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} className="border-2 border-gray-400" />
      <input {...register('password')} className="border-2 border-gray-400" />
      <div>
        {errors.email && <span>{errors.email.message}</span>}
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginWithPassword;
