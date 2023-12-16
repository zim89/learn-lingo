'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { BookOpenText, Heart, Star } from 'lucide-react';
import { useAuthStore, useFavoritesStore } from '@/utils/zustand';
import useStore from '@/utils/zustand/useStore';
import { Teacher } from '@/app/teachers/page';
import { toast } from 'react-toastify';
import ReviewItem from '@/components/ReviewItem';
import BookLessonModal from '@/components/BookLessonModal';
import { useDisclosure } from '@nextui-org/react';

interface TeacherItemProps {
  teacher: Teacher;
}

export default function TeacherItem({ teacher }: TeacherItemProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const favorites = useStore(useFavoritesStore, (state) => state);
  const user = useStore(useAuthStore, (state) => state.user);
  const isFavorite =
    favorites?.favorites.some(({ id }) => id === teacher.id) ?? false;

  const toggleFavorite = () => {
    if (!user) {
      toast.warning('Please register or login for adding to favorites!');
      return;
    }
    if (isFavorite) {
      favorites?.removeFromFav(teacher.id);
      return;
    }
    favorites?.addToFav(teacher);
  };

  return (
    <>
      <div className={'flex gap-12 rounded-3xl bg-white p-6'}>
        {/*Avatar*/}
        <div className='flex-none'>
          <div className='relative flex h-[120px] w-[120px] items-center justify-center rounded-full border-3 border-secondary-hover'>
            <Image
              src={teacher.avatar_url}
              alt={'Teacher avatar'}
              width={96}
              height={96}
              className={'overflow-hidden rounded-full'}
            />
            <div className='absolute right-[17px] top-[17px] flex h-3 w-3 items-center justify-center rounded-full bg-white'>
              <div className='h-2 w-2 rounded-full bg-success'></div>
            </div>
          </div>
        </div>

        {/*Main Content*/}
        <div className={'w-full'}>
          <div className='mb-2 flex justify-between text-base font-medium text-primary'>
            <span className={'text-grey'}>Languages</span>
            <div className={'flex gap-16'}>
              <ul className={'flex flex-row items-center gap-4'}>
                <li className={'flex items-center gap-2'}>
                  <BookOpenText className={'h-4 w-4'} />
                  Lessons online
                </li>
                <li className={'flex items-center'}>
                  Lessons done: {teacher.lessons_done}
                </li>
                <li className={'flex items-center gap-2'}>
                  <Star className={'h-4 w-4 fill-amber-500 stroke-amber-500'} />
                  <span>Rating: {teacher.rating}</span>
                </li>
                <li>
                  Price / 1 hour:{' '}
                  <span className={'text-success'}>
                    {teacher.price_per_hour}$
                  </span>
                </li>
              </ul>
              <button type='button' onClick={toggleFavorite}>
                {!user ? (
                  <Heart className='h-6 w-6' />
                ) : (
                  <Heart
                    className={
                      isFavorite
                        ? 'h-6 w-6 fill-secondary stroke-secondary'
                        : 'h-6 w-6'
                    }
                  />
                )}
              </button>
            </div>
          </div>
          <h2 className='mb-8 text-2xl font-medium leading-none'>
            {teacher.name} {teacher.surname}
          </h2>
          <div className='mb-4 flex flex-col gap-2'>
            <p>
              <span className='text-grey'>Speaks: </span>
              <span className='underline'>{teacher.languages.join(', ')}</span>
            </p>
            <p>
              <span className='text-grey'>Lesson Info: </span>
              {teacher.lesson_info}
            </p>
            <p>
              <span className='text-grey'>Conditions: </span>
              {teacher.conditions.join(' ')}
            </p>
          </div>

          <div className='mb-8'>
            {isCollapsed ? (
              <button
                type='button'
                className='text-base underline transition-colors hover:text-secondary'
                onClick={() => setIsCollapsed(false)}
              >
                Read more
              </button>
            ) : (
              <ul className='flex flex-col gap-8'>
                {teacher.reviews.map(
                  ({ reviewer_name, reviewer_rating, comment }) => (
                    <li key={reviewer_name}>
                      <ReviewItem
                        reviewer_name={reviewer_name}
                        reviewer_rating={reviewer_rating}
                        comment={comment}
                      />
                    </li>
                  )
                )}
              </ul>
            )}
          </div>

          <div className='flex gap-2 '>
            {teacher.levels.map((level: string) => (
              <span
                key={level}
                className='inline-block rounded-[35px] border border-primary/20 bg-transparent px-3 py-2 text-sm font-medium leading-[1.14286] first:border-secondary first:bg-secondary'
              >
                {level}
              </span>
            ))}
          </div>

          {!isCollapsed && (
            <button
              className='mt-8 rounded-xl bg-secondary px-12 py-4 text-lg font-bold transition-colors hover:bg-secondary-hover'
              onClick={onOpen}
            >
              Book trial lesson
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <BookLessonModal
          onClose={onClose}
          onOpenChange={onOpenChange}
          teacher={teacher}
        />
      )}
    </>
  );
}
