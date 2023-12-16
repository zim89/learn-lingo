import React from 'react';
import { Spinner } from '@nextui-org/react';

const LoadingOverlay = () => {
  return (
    <div className='absolute inset-0 flex items-center justify-center bg-white/80'>
      <Spinner classNames={{ wrapper: 'w-14 h-14' }} />
    </div>
  );
};

export default LoadingOverlay;
