import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';
import { registerSchema } from '@/helpers/yupSchemas';
import { AuthFormProps, LoginFormInput } from '@/components/LoginForm';
import { toast } from 'react-toastify';
import { createClient } from '@/utils/supabase/client';
import { useAuthStore } from '@/utils/zustand';

export interface RegisterFormInput extends LoginFormInput {
  username: string;
}

export default function RegisterForm({ onClose, setIsLoading }: AuthFormProps) {
  const [isVisible, setIsVisible] = useState(false);
  const supabase = createClient();
  const { setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { username: '', email: '', password: '' },
    resolver: yupResolver(registerSchema),
  });

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const onSubmit: SubmitHandler<RegisterFormInput> = async (formData) => {
    setIsLoading(true);
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
    setIsLoading(false);

    if (error) {
      toast.error('Something went wrong. Try later!');
      console.error(error.message);
      return;
    }

    if (user) {
      toast.success('Registration completed successfully!');
      setUser({ id: user?.id, email: user?.email });
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/*USERNAME input*/}
      <div className='relative mb-6'>
        <input
          {...register('username', { required: true })}
          placeholder='Name'
          autoComplete='off'
          type='text'
          autoFocus
          className={clsx(
            'w-full rounded-xl border border-primary/10 px-[18px] py-4 text-base leading-[1.375] placeholder:text-base placeholder:leading-[1.375] focus:border-primary focus:outline-none',
            errors.username && '!border-red-600'
          )}
        />
        <p className='absolute -top-5 left-0 text-sm text-red-600'>
          {errors.username?.message}
        </p>
      </div>

      {/*EMAIL input*/}
      <div className='relative mb-6'>
        <input
          {...register('email', { required: true })}
          placeholder='Email'
          // autoComplete='off'
          type='text'
          className={clsx(
            'w-full rounded-xl border border-primary/10 px-[18px] py-4 text-base leading-[1.375] placeholder:text-base placeholder:leading-[1.375] focus:border-primary focus:outline-none',
            errors.email && '!border-red-600'
          )}
        />
        <p className='absolute -top-5 left-0 text-sm text-red-600'>
          {errors.email?.message}
        </p>
      </div>

      {/*PASSWORD input*/}
      <div className='relative mb-10'>
        <input
          {...register('password', { required: true })}
          placeholder='Password'
          autoComplete='off'
          type={isVisible ? 'text' : 'password'}
          className={clsx(
            'w-full rounded-xl border border-primary/10 px-[18px] py-4 text-base leading-[1.375] placeholder:text-base placeholder:leading-[1.375] focus:border-primary focus:outline-none',
            errors.password && '!border-red-600'
          )}
        />
        <p className='absolute -top-5 left-0 text-sm text-red-600'>
          {errors.password?.message}
        </p>
        <button
          className='absolute right-[18px] top-1/2 -translate-y-1/2 text-2xl text-primary'
          type='button'
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <Eye className='pointer-events-none' />
          ) : (
            <EyeOff className='pointer-events-none' />
          )}
        </button>
      </div>

      <button
        type='submit'
        className='w-full rounded-xl bg-secondary py-4 text-center text-[18px] font-bold leading-7 transition-colors hover:bg-secondary-hover'
      >
        Sign Up
      </button>
    </form>
  );
}
