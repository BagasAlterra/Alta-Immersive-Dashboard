import React, { FC } from "react";

import Drawer from "components/Drawer";
import Navbar from "components/Navbar";

interface Props {
  children: React.ReactNode;
  subTitle: string;
}

const Layout: FC<Props> = ({ children, subTitle }) => {
  return (
    <div className="flex h-screen w-full">
      <Drawer />
      <div className="flex h-full w-full flex-col overflow-auto">
        <Navbar subTitle={subTitle} />
        <div className="h-full w-full overflow-auto bg-alta-background p-9">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
