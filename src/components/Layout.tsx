import React, { FC } from "react";

import Drawer from "components/Drawer";
import Navbar from "components/Navbar";

interface Props {
  children: React.ReactNode;
  subTitle: string;
}

const Layout: FC<Props> = ({ children, subTitle }) => {
  return (
    <div className="w-full h-screen flex">
      <Drawer />
      <div className="w-full h-full flex flex-col">
        <Navbar subTitle={subTitle} />
        <div className="w-full h-full overflow-auto bg-alta-background">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
