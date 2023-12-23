'use client';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Palette } from 'lucide-react';
import clsx from 'clsx';
import useStore from '@/utils/zustand/useStore';
import { useAuthStore, useThemeStore } from '@/utils/zustand';
import { Theme } from '@/utils/zustand/types';

export function ThemeSwitcher() {
  const themeStore = useStore(useThemeStore, (state) => state);

  const onChangeTheme = (theme: Theme) => {
    if (theme) {
      themeStore?.setTheme(theme);
    }
  };
  return (
    <div className=''>
      <Menu as='div' className='relative'>
        <Menu.Button className='flex h-10 w-10 items-center justify-center rounded-full text-secondary transition-all hover:scale-125 '>
          <Palette className='h-7 w-7' />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 mt-2 origin-top-right rounded-md bg-white px-3 py-4 shadow-lg ring-1 ring-black/5 focus:outline-none'>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={clsx(
                    'flex items-center gap-2 rounded-md px-1 py-1',
                    active && 'bg-gray-100'
                  )}
                  onClick={() => onChangeTheme('theme1')}
                >
                  <span className='block h-6 w-6 rounded-full bg-[#F4C550]'></span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={clsx(
                    'flex items-center gap-2 rounded-md px-1 py-1',
                    active && 'bg-gray-100'
                  )}
                  onClick={() => onChangeTheme('theme2')}
                >
                  <span className='block h-6 w-6 rounded-full bg-[#9FBAAE]'></span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={clsx(
                    'flex items-center gap-2 rounded-md px-1 py-1',
                    active && 'bg-gray-100'
                  )}
                  onClick={() => onChangeTheme('theme3')}
                >
                  <span className='block h-6 w-6 rounded-full bg-[#9FB7CE]'></span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={clsx(
                    'flex items-center gap-2 rounded-md px-1 py-1',
                    active && 'bg-gray-100'
                  )}
                  onClick={() => onChangeTheme('theme4')}
                >
                  <span className='block h-6 w-6 rounded-full bg-[#E0A39A]'></span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={clsx(
                    'flex items-center gap-2 rounded-md px-1 py-1',
                    active && 'bg-gray-100'
                  )}
                  onClick={() => onChangeTheme('theme5')}
                >
                  <span className='block h-6 w-6 rounded-full bg-[#F0AA8D]'></span>
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
