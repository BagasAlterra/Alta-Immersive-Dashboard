import { useProSidebar } from "react-pro-sidebar";
import { FC } from "react";

interface Props {
  subTitle: string;
}

const Navbar: FC<Props> = ({ subTitle }) => {
  const { toggleSidebar } = useProSidebar();

  return (
    <div className="navbar bg-white">
      <div className="flex-none lg:hidden">
        <button
          className="btn btn-square btn-ghost text-black"
          onClick={() => toggleSidebar()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1 flex-col items-start px-4">
        <p className="normal-case text-xl text-black font-bold lg:flex md:flex sm:flex hidden">
          Immersive Dashboard
        </p>
        <p className="text-sm text-black lg:normal-case md:normal-case sm:normal-case font-semibold">{subTitle}</p>
      </div>
      <div className="flex-none">
        <p className="normal-case text-base text-black">
          {/* TODO: Change to global state */}
          Hello, <span className="font-bold">John Doe</span>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
