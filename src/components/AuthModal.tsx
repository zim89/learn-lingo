import React, { useState } from 'react';
import { Modal, ModalContent, ModalBody } from '@nextui-org/react';
import { AuthType } from '@/components/Header';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import LoadingOverlay from '@/components/LoadingOverlay';

export interface ModalProps {
  onClose: () => void;
  onOpenChange?: () => void;
  type?: AuthType;
}

export default function AuthModal({ onClose, onOpenChange, type }: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      isOpen
      onOpenChange={onOpenChange}
      backdrop='blur'
      classNames={{
        base: 'max-w-[566px] p-16 m-0 sm:m-0',
        body: 'block p-0',
        closeButton: 'text-2xl p-1 top-3 text-primary right-3',
      }}
    >
      <ModalContent className='relative overflow-hidden'>
        <ModalBody>
          <h2 className='mb-5 text-[40px] font-medium leading-[1.2] -tracking-[0.8px]'>
            {type === 'login' ? 'Log In' : 'Registration'}
          </h2>

          <p className='mb-10 text-base leading-[1.375] text-primary/80'>
            {type === 'login'
              ? 'Welcome back! Please enter your credentials to access your account and continue your search for an teacher.'
              : 'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.'}
          </p>

          {type === 'login' && (
            <LoginForm onClose={onClose} setIsLoading={setIsLoading} />
          )}
          {type === 'register' && (
            <RegisterForm onClose={onClose} setIsLoading={setIsLoading} />
          )}
        </ModalBody>
        {isLoading && <LoadingOverlay />}
      </ModalContent>
    </Modal>
  );
}
