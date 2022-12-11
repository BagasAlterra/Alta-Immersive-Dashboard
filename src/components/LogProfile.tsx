import { FC } from 'react';

import Cards from 'components/Cards';

interface Props {
  full_name: string;
  nick_name: string;
  join_class: string;
  major: string;
  institution: string;
  phone: number;
  telegram: string;
  email: string;
}

const LogProfile: FC<Props> = ({
  full_name,
  nick_name,
  join_class,
  major,
  institution,
  phone,
  telegram,
  email,
}) => {
  return (
    <Cards className="flex">
      <div className="h-full w-full p-6">
        <h2 className="font-inter text-2xl font-bold tracking-widest text-black">
          {full_name} <span className="text-sm">({nick_name})</span>
        </h2>
        <p className="font-inter text-sm font-thin leading-8 text-black">
          {join_class}
        </p>
        <p className="font-inter text-base capitalize text-black">{major}</p>
        <p className="font-inter text-base text-black">{institution}</p>
      </div>
      <div className="h-full w-full p-6">
        <p className="font-inter text-base ordinal slashed-zero tabular-nums text-black">
          Phone: {phone}
        </p>
        <p className="font-inter text-base text-black">Telegram: {telegram}</p>
        <p className="font-inter text-base text-black">Email: {email}</p>
      </div>
    </Cards>
  );
};

export default LogProfile;
