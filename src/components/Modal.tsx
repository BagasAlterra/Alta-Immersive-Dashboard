import { FC, ReactNode } from "react";

interface Props {
  content: ReactNode;
  title: string;
  id: string;
}

const Modal: FC<Props> = ({ title, id, content }) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer" data-theme="light">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-xs font-bold sm:text-sm md:text-base lg:text-lg">
            {title}
          </h3>
          {content}
        </label>
      </label>
    </>
  );
};

export default Modal;
