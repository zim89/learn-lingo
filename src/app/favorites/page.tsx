'use client';
import { useFavoritesStore } from '@/utils/zustand';
import useStore from '@/utils/zustand/useStore';
import TeacherItem from '@/components/TeacherItem';
import React from 'react';

export default function Favorites() {
  const favorites =
    useStore(useFavoritesStore, (state) => state.favorites) ?? [];

  return (
    <section className='min-h-screen bg-primary/10 pb-24 pt-14'>
      <div className='container'>
        <ul className='mb-16 mt-8 flex flex-col gap-6'>
          {favorites.length > 0 &&
            favorites.map((teacher) => (
              <li key={teacher.id}>
                <TeacherItem teacher={teacher} />
              </li>
            ))}
          {favorites.length === 0 && (
            <li className='pt-10 text-center text-2xl font-bold text-primary'>
              Your collection is empty
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
