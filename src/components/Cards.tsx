import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const Cards: FC<Props> = ({ children, className }) => {
  const cls: string = className ? className : "";

  return (
    <div className={`mb-3 rounded-xl border bg-white p-2 shadow-lg ${cls}`}>
      {children}
    </div>
  );
};

export default Cards;
