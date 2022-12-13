import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const Cards: FC<Props> = ({ children, className }) => {
  const cls: string = className ? className : '';

  return (
    <div
      className={`relative mb-3 rounded-xl border bg-white py-6 px-8 shadow-lg ${cls}`}
    >
      {children}
    </div>
  );
};

export default Cards;
