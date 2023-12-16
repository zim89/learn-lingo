import React from 'react';

function Statistic() {
  return (
    <section className='mt-6'>
      <div className='container'>
        <div className='flex justify-center gap-[100px] rounded-[30px] border-[1.5px] border-dashed border-secondary py-10'>
          <div className='flex gap-4'>
            <span className='text-[28px] font-medium leading-8 -tracking-[0.56px]'>
              32,000 +
            </span>
            <span className='inline-block w-20 text-sm leading-[1.286] -tracking-[0.28px] text-primary/70'>
              Experienced tutors
            </span>
          </div>
          <div className='flex gap-4'>
            <span className='text-[28px] font-medium leading-8 -tracking-[0.56px]'>
              300,000 +
            </span>
            <span className='inline-block w-20 text-sm leading-[1.286] -tracking-[0.28px] text-primary/70'>
              5-star tutor reviews
            </span>
          </div>
          <div className='flex gap-4'>
            <span className='text-[28px] font-medium leading-8 -tracking-[0.56px]'>
              120 +
            </span>
            <span className='inline-block w-20 text-sm leading-[1.286] -tracking-[0.28px] text-primary70'>
              Subjects taught
            </span>
          </div>
          <div className='flex gap-4'>
            <span className='text-[28px] font-medium leading-8 -tracking-[0.56px]'>
              200 +
            </span>
            <span className='inline-block w-20 text-sm leading-[1.286] -tracking-[0.28px] text-primary/70'>
              Tutor nationalities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Statistic;
