'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

function Hero() {
  const router = useRouter();

  return (
    <section>
      <div className='container'>
        <div className='flex flex-row gap-6'>
          <div className='w-[720px] rounded-[30px] bg-grey-light px-16 py-[98px]'>
            <div className='relative mb-8'>
              <h1 className='relative z-10 text-5xl font-medium leading-[1.167] -tracking-[0.96px]'>
                Unlock your potential with the best&nbsp;&nbsp;
                <span className='font-normal italic'>language</span>&nbsp;tutors
              </h1>
              <span className='absolute bottom-[6px] left-[186px] inline-block h-10 w-[199px] rounded-lg bg-secondary-hover'></span>
            </div>

            <p className='mb-16 w-[471px] text-base leading-[1.375] -tracking-[0.32px]'>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>

            <button
              className='rounded-xl bg-secondary px-[88px] py-4 text-lg font-bold leading-7 transition-colors hover:bg-secondary-hover'
              onClick={() => router.push('/teachers')}
            >
              Get started
            </button>
          </div>
          <div className='bg-hero relative h-[530px] grow rounded-[30px] bg-contain'></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
