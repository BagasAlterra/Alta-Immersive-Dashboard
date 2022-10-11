import React, { FC } from "react";

import Drawer from "components/Drawer";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="w-full h-screen flex">
      <Drawer />
      <div className="w-full h-full flex flex-col">
        {/* TODOS: HEADER HERE */}
        <div className="w-full h-full overflow-auto bg-alta-background">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
