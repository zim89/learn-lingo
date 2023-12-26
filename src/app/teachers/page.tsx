'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import FilterBar from '@/components/FilterBar';
import { useFilterStore } from '@/utils/zustand';
import useStore from '@/utils/zustand/useStore';
import TeacherItem from '@/components/TeacherItem';

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface Teacher {
  id: number;
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  reviews: Review[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
}

export default function Teachers() {
  const supabase = createClient();
  const filter = useStore(useFilterStore, (state) => state.filter);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(4);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const total = useRef(0);
  const firstRender = useRef(true);

  const fetchTeachers = useCallback(
    async (page = currentPage) => {
      let query = supabase
        .from('teachers')
        .select('*', { count: 'exact' })
        .range((page - 1) * limit, page * limit - 1);

      if (filter?.language) {
        query = query.contains('languages', [filter.language]);
      }
      if (filter?.level) {
        query = query.contains('levels', [filter.level]);
      }
      if (filter?.price) {
        query = query.lte('price_per_hour', filter.price);
      }

      const { data, count } = await query;
      return { data, count };
    },
    [
      filter?.language,
      filter?.level,
      filter?.price,
      limit,
      currentPage,
      supabase,
    ]
  );

  useEffect(() => {
    (async () => {
      if (firstRender.current) {
        const { data, count } = await fetchTeachers();
        firstRender.current = false;
        setCurrentPage(2);
        if (data) setTeachers([...data]);
        if (count) total.current = count;
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (
        !firstRender.current &&
        (filter?.language || filter?.level || filter?.price)
      ) {
        const { data, count } = await fetchTeachers(1);
        setCurrentPage(2);
        if (data) setTeachers([...data]);
        if (count) total.current = count;
      }
    })();
  }, [filter]);

  const handleLoadMore = async () => {
    const { data, count } = await fetchTeachers();
    setCurrentPage((prev) => prev + 1);
    if (data) setTeachers([...teachers, ...data]);
    if (count) total.current = count;
  };

  return (
    <section className='min-h-screen bg-primary/10 pb-24 pt-14'>
      <div className='container'>
        <FilterBar />
        <ul className='mb-16 mt-8 flex flex-col gap-6'>
          {teachers.length > 0 &&
            teachers.map((teacher) => (
              <li key={teacher.id}>
                <TeacherItem teacher={teacher} />
              </li>
            ))}
          {teachers.length === 0 && filter && !firstRender.current && (
            <li className='pt-10 text-center text-2xl font-bold text-primary'>
              Nothing was found for your request
            </li>
          )}
        </ul>

        {teachers.length > 0 && teachers.length < total.current && (
          <button
            className='mx-auto block rounded-xl bg-secondary px-12 py-4 text-lg font-bold leading-7 transition-colors hover:bg-secondary-hover'
            onClick={handleLoadMore}
          >
            Load more
          </button>
        )}
      </div>
    </section>
  );
}
