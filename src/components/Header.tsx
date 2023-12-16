'use client';
import React, { useEffect, useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogIn } from 'lucide-react';
import clsx from 'clsx';
import AuthModal from '@/components/AuthModal';
import logoImg from '/public/logo.svg';
import { toast } from 'react-toastify';
import { createClient } from '@/utils/supabase/client';
import { useAuthStore, useThemeStore } from '@/utils/zustand';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import useStore from '@/utils/zustand/useStore';

export type AuthType = 'register' | 'login' | null;

function Header() {
  const [type, setType] = useState<AuthType>(null);
  const currentRoute = usePathname();
  const supabase = createClient();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { user: currentUser, setUser, clearUser } = useAuthStore();
  const theme = useStore(useThemeStore, (state) => state.current);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    (async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.log(error.message);
        return;
      }

      if (session?.user) {
        setUser({ id: session?.user.id, email: session?.user.email });
      }
    })();
  }, [setUser, supabase]);

  const onLogin = () => {
    setType('login');
    onOpen();
  };

  const onRegister = () => {
    setType('register');
    onOpen();
  };

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error('Something went wrong. Try later!');
      console.error(error.message);
      return;
    }
    clearUser();
  };

  return (
    <>
      <div className='container lg:px-[128px]'>
        <Navbar
          classNames={{
            base: 'bg-transparent',
            wrapper: 'max-w-[1440px] p-0 h-[88px]',
            brand: 'flex-grow-0 gap-2',
            content: 'data-[justify=end]:flex-grow-0',
          }}
        >
          <NavbarBrand>
            <Image src={logoImg} alt={'Logo image'} />
            <p className=' text-xl font-medium leading-6 tracking-[-0.4px]'>
              LearnLingo
            </p>
          </NavbarBrand>

          <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
            <NavbarItem>
              <Link
                href={'/'}
                className={clsx(
                  'relative text-base leading-5 text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full',
                  currentRoute === '/' && 'font-medium'
                )}
              >
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                href={'/teachers'}
                className={clsx(
                  'relative text-base leading-5 text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full',
                  currentRoute === '/teachers' && 'font-medium'
                )}
              >
                Teachers
              </Link>
            </NavbarItem>
            {currentUser && (
              <NavbarItem>
                <Link
                  href={'/favorites'}
                  className={clsx(
                    'relative text-base leading-5 text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full',
                    currentRoute === '/favorites' && 'font-medium'
                  )}
                >
                  Favorites
                </Link>
              </NavbarItem>
            )}
          </NavbarContent>

          <NavbarContent justify='end' className='flex md:gap-2 lg:gap-4'>
            <ThemeSwitcher />
            {currentUser ? (
              <Dropdown placement='bottom-end'>
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as='button'
                    className='transition-transform'
                    color='secondary'
                    name='Jason Hughes'
                    size='sm'
                    src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label='Profile Actions' variant='flat'>
                  <DropdownItem
                    key='profile'
                    className='h-14 gap-2'
                    textValue={currentUser.email}
                  >
                    <p className=''>Signed in as</p>
                    <p className='font-medium'>{currentUser.email}</p>
                  </DropdownItem>
                  <DropdownItem key='logout' color='danger' onClick={onLogout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <>
                <NavbarItem>
                  <button
                    className='group flex items-center gap-2 bg-transparent p-0'
                    onClick={onLogin}
                  >
                    <LogIn className='h-5 w-5 stroke-2 text-secondary transition-transform group-hover:-translate-x-1 group-hover:scale-110' />
                    <span className='text-base font-bold leading-5 transition-transform group-hover:scale-110'>
                      Log in
                    </span>
                  </button>
                </NavbarItem>
                <NavbarItem>
                  <Button
                    color='primary'
                    className='rounded-xl text-base font-bold leading-5 lg:px-10 lg:py-[14px]'
                    onClick={onRegister}
                  >
                    Registration
                  </Button>
                </NavbarItem>
              </>
            )}
          </NavbarContent>
        </Navbar>
      </div>

      {isOpen && (
        <AuthModal onClose={onClose} onOpenChange={onOpenChange} type={type} />
      )}
    </>
  );
}

export default Header;
