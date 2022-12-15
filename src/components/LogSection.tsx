import moment from 'moment';
import { FC } from 'react';

import Cards from 'components/Cards';

interface Props {
  section: string;
  name: string;
  date: any;
  status: string;
  feedback: string;
}

const LogSection: FC<Props> = ({
  section = 'No section',
  name = '-',
  date = 'no date',
  status = '-',
  feedback = 'No Feedback',
}) => {
  return (
    <Cards className="my-3 flex">
      <div className="h-full w-full p-2">
        <h2 className="font-inter text-xl font-bold text-black">{section}</h2>
        <p className="font-inter text-lg leading-loose text-black">{name}</p>
        <p className="font-inter font-thin text-black">{date}</p>
      </div>
      <div className="h-full w-full p-2">
        <p className="mb-3 text-justify font-inter text-base tracking-wide text-black">
          {feedback}
        </p>
        <p className="font-inter text-base font-bold text-black">
          Changed Status: {status}
        </p>
      </div>
    </Cards>
  );
};

export default LogSection;
