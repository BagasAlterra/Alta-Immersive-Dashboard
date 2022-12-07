import { FC, ReactNode } from 'react';
import { clsx } from 'clsx';

import Sidebar from 'components/Sidebar';
import Navbar from 'components/Navbar';

interface Props {
  children: ReactNode;
  subTitle: string;
  isFull?: boolean;
}

const Layout: FC<Props> = ({ children, subTitle, isFull }) => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex h-full w-full flex-col overflow-auto">
        <Navbar subTitle={subTitle} />
        <div
          className={clsx(
            'h-full w-full overflow-auto bg-alta-background',
            !isFull && 'p-9'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
