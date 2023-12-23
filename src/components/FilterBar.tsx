'use client';
import React, { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { languages, levels, prices } from '@/lib/data';
import { ChevronDown } from 'lucide-react';
import { Button } from '@nextui-org/react';
import { useFilterStore } from '@/utils/zustand';
import { Filter } from '@/utils/zustand/types';
import useStore from '@/utils/zustand/useStore';

export default function FilterBar() {
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [price, setPrice] = useState('');
  const filterStore = useStore(useFilterStore, (state) => state);

  useEffect(() => {
    filterStore?.clearFilter();
  }, []);

  const onReset = () => {
    setLanguage('');
    setLevel('');
    setPrice('');
    filterStore?.clearFilter();
  };

  const onSearch = () => {
    const data = { language, level, price };

    for (const key in data) {
      if (!data[key as keyof Filter]) {
        delete data[key as keyof Filter];
      }
    }

    if (JSON.stringify(data) === '{}') return;
    filterStore?.setFilter(data);
  };

  return (
    <div className='flex items-end gap-5'>
      {/*LANGUAGE Select*/}
      <div className='flex flex-col gap-2'>
        <span className='text-sm font-medium leading-[1.286] text-grey'>
          Languages
        </span>
        <Listbox value={language} onChange={setLanguage}>
          <div className='relative'>
            <Listbox.Button className='group relative h-11 w-[221px] rounded-lg bg-white py-3 pl-[18px] text-left text-lg font-medium leading-[1.1111] '>
              <span className='block'>{language}</span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                <ChevronDown
                  className='h-5 w-5 stroke-2 text-primary transition-transform group-aria-expanded:rotate-180'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className='absolute z-10 mt-2 flex w-full flex-col gap-2 rounded-lg border border-gray-300 bg-white py-[14px] pl-[18px] shadow-xl'>
              {languages.map((item) => (
                <Listbox.Option
                  key={item.label}
                  value={item.label}
                  className='cursor-pointer text-lg font-medium leading-[1.1111] text-primary/20'
                >
                  {({ active, selected }) => (
                    <span
                      className={`text-lg font-medium leading-[1.1111] ${
                        active ? 'text-primary' : 'text-primary/20'
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {/*LEVEL Select*/}
      <div className='flex flex-col gap-2'>
        <span className='text-sm font-medium leading-[1.286] text-grey'>
          Level of knowledge
        </span>
        <Listbox value={level} onChange={setLevel}>
          <div className='relative'>
            <Listbox.Button className='group relative h-11 w-[198px] rounded-lg bg-white py-3 pl-[18px] pr-10 text-left text-lg font-medium leading-[1.1111]'>
              <span className='block overflow-hidden text-ellipsis whitespace-nowrap'>
                {level}
              </span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                <ChevronDown
                  className='h-5 w-5 stroke-2 text-primary transition-transform group-aria-expanded:rotate-180'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className='absolute z-10 mt-2 flex w-full flex-col gap-2 rounded-lg border border-gray-300 bg-white px-[18px] py-[14px] shadow-xl'>
              {levels.map((item) => (
                <Listbox.Option
                  key={item.label}
                  value={item.label}
                  className='cursor-pointer text-lg font-medium leading-[1.1111] text-primary/20'
                >
                  {({ active, selected }) => (
                    <span
                      className={`block overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium leading-[1.1111] ${
                        active ? 'text-primary' : 'text-primary/20'
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {/*PRICE Select*/}
      <div className='flex flex-col gap-2'>
        <span className='text-sm font-medium leading-[1.286] text-grey'>
          Price
        </span>
        <Listbox value={price} onChange={setPrice}>
          <div className='relative'>
            <Listbox.Button className='group relative h-11 w-[124px] rounded-lg bg-white py-3 pl-[18px] text-left text-lg font-medium leading-[1.1111]'>
              <span className='block'>{price && price + ' $'}</span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                <ChevronDown
                  className='h-5 w-5 stroke-2 text-primary transition-transform group-aria-expanded:rotate-180'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className='absolute z-10 mt-2 flex w-full flex-col gap-2 rounded-lg border border-gray-300 bg-white py-[14px] pl-[18px] shadow-xl'>
              {prices.map((item) => (
                <Listbox.Option
                  key={item.label}
                  value={item.label}
                  className='cursor-pointer text-lg font-medium leading-[1.1111] text-primary/20'
                >
                  {({ active, selected }) => (
                    <span
                      className={`text-lg font-medium leading-[1.1111] ${
                        active ? 'text-primary' : 'text-primary/20'
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      <div className='flex gap-2'>
        <Button
          size='md'
          color='success'
          className='h-11'
          type='button'
          onClick={onSearch}
        >
          Search
        </Button>

        <Button
          size='md'
          color='danger'
          className='h-11'
          type='button'
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
