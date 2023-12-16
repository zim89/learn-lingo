import React from 'react';
import { Review } from '@/utils/zustand/types';
import { Star } from 'lucide-react';

export default function ReviewItem({
  reviewer_name,
  reviewer_rating,
  comment,
}: Review) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-3'>
        <div className='flex h-11 w-11 items-center justify-center rounded-full bg-teal-500 text-base font-bold text-white'>
          {reviewer_name[0].toUpperCase()}
        </div>
        <div className='flex flex-col justify-between'>
          <p className='text-base font-medium text-grey'>{reviewer_name}</p>
          <div className='flex gap-2'>
            <Star className={'h-4 w-4 fill-amber-500 stroke-amber-500'} />
            <span className='text-sm font-medium leading-[1.28571]'>
              {reviewer_rating}
            </span>
          </div>
        </div>
      </div>
      <p className='text-base font-medium'>{comment}</p>
    </div>
  );
}
