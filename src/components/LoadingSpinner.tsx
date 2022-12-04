import { FC } from 'react';

const LoadingSpinner: FC = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="m-3 flex h-11 w-11 animate-spin items-center justify-center rounded-full bg-gradient-to-tr from-white to-alta-orange">
        <div className="h-9 w-9 rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
