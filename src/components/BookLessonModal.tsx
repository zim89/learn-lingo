import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  RadioGroup,
  Radio,
} from '@nextui-org/react';
import { Teacher } from '@/utils/zustand/types';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bookLessonSchema } from '@/helpers/yupSchemas';

import clsx from 'clsx';

interface ModalProps {
  onClose: () => void;
  onOpenChange: () => void;
  teacher: Teacher;
}

interface FormData {
  fullname: string;
  email: string;
  phone: string;
}

export default function BookLessonModal({
  onClose,
  onOpenChange,
  teacher,
}: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { fullname: '', email: '', phone: '' },
    resolver: yupResolver(bookLessonSchema),
  });
  const [reason, setReason] = useState<string>('Career and business');

  const onSubmit = (data: FormData) => {
    console.log({ reason, ...data });
    onClose();
  };

  return (
    <Modal
      isOpen
      onOpenChange={onOpenChange}
      backdrop='blur'
      placement='top'
      classNames={{
        wrapper: 'top-10',
        base: 'max-w-[600px] p-16 m-0 sm:m-0',
        body: 'block p-0',
        closeButton: 'text-2xl p-1 top-3 text-primary right-3',
      }}
    >
      <ModalContent className='relative'>
        <ModalBody>
          <h2 className='mb-5 text-[40px] font-medium leading-[1.2]'>
            Book trial lesson
          </h2>

          <p className='mb-5 text-base leading-[1.375] text-primary/80'>
            Our experienced tutor will assess your current language level,
            discuss your learning goals, and tailor the lesson to your specific
            needs.
          </p>

          <div className='mb-10 flex items-start gap-[14px]'>
            <Image
              src={teacher.avatar_url}
              alt='Teacher avatar'
              width={44}
              height={44}
              className='flex-none overflow-hidden rounded-full'
            />
            <div className='mb-5 flex flex-col gap-1'>
              <span className='text-xs font-medium leading-[1.33333] text-grey'>
                Your teacher
              </span>
              <span className='text-base font-medium'>
                {teacher.name} {teacher.surname}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-10'>
              <h3 className='mb-5 text-2xl font-medium leading-[1.33333]'>
                What is your main reason for learning English?
              </h3>
              <RadioGroup
                value={reason}
                onValueChange={setReason}
                color='secondary'
              >
                <Radio
                  value='Career and business'
                  classNames={{
                    label: 'text-base leading-[1.375]',
                  }}
                >
                  Career and business
                </Radio>
                <Radio
                  value='Lesson for kids'
                  classNames={{
                    label: 'text-base leading-[1.375]',
                  }}
                >
                  Lesson for kids
                </Radio>
                <Radio
                  value='Living abroad'
                  classNames={{
                    label: 'text-base leading-[1.375]',
                  }}
                >
                  Living abroad
                </Radio>
                <Radio
                  value='Exams and coursework'
                  classNames={{
                    label: 'text-base leading-[1.375]',
                  }}
                >
                  Exams and coursework
                </Radio>
                <Radio
                  value='Culture, travel or hobby'
                  classNames={{
                    label: 'text-base leading-[1.375]',
                  }}
                >
                  Culture, travel or hobby
                </Radio>
              </RadioGroup>
            </div>

            {/*FULLNAME input*/}
            <div className='relative mb-6'>
              <input
                {...register('fullname', { required: true })}
                placeholder='Full name'
                type='text'
                className={clsx(
                  'w-full rounded-xl border border-primary/10 px-[18px] py-4 text-base leading-[1.375] placeholder:text-base placeholder:leading-[1.375] focus:border-primary focus:outline-none',
                  errors.fullname && '!border-red-600'
                )}
              />
              <p className='absolute -top-5 left-0 text-sm text-red-600'>
                {errors.fullname?.message}
              </p>
            </div>

            {/*EMAIL input*/}
            <div className='relative mb-6'>
              <input
                {...register('email', { required: true })}
                placeholder='Email'
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

            {/*PHONE input*/}
            <div className='relative mb-10'>
              <input
                {...register('phone', { required: true })}
                placeholder='Phone number'
                type='text'
                className={clsx(
                  'w-full rounded-xl border border-primary/10 px-[18px] py-4 text-base leading-[1.375] placeholder:text-base placeholder:leading-[1.375] focus:border-primary focus:outline-none',
                  errors.phone && '!border-red-600'
                )}
              />
              <p className='absolute -top-5 left-0 text-sm text-red-600'>
                {errors.phone?.message}
              </p>
            </div>

            <button
              type='submit'
              className='w-full rounded-xl bg-secondary py-4 text-center text-lg font-bold transition-colors hover:bg-secondary-hover'
            >
              Book
            </button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
