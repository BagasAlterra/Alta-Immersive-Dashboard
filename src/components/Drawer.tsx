import {
  HomeIcon,
  UsersIcon,
  UserPlusIcon,
  BookOpenIcon,
  UserGroupIcon,
  QueueListIcon,
  UserCircleIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";

const Drawer = () => {
  const { collapseSidebar, collapsed } = useProSidebar();

  return (
    <Sidebar backgroundColor={"#152C59"} customBreakPoint="1024px">
      <img className="mx-auto" src="/ALTA-WHITE.png" alt="logo alta" />
      <Menu
        renderMenuItemStyles={({ active }) => ({
          ".menu-icon": {
            width: "1.5rem",
            minWidth: "1.5rem",
            height: "1.5rem",
          },
          ".menu-anchor": {
            backgroundColor: active ? "#313741" : "initial",
            color: "#FFF",
          },
          ".sub-menu-content": {
            backgroundColor: "#152C59",
            padding: "0px",
          },
        })}
      >
        <div className="divider my-0"></div>
        <MenuItem icon={<HomeIcon />} href="/">
          Dashboard
        </MenuItem>
        <SubMenu label="Mentee" icon={<UserCircleIcon />}>
          <MenuItem icon={<UserGroupIcon />} href="/mentees">
            Mentee List
          </MenuItem>
          <MenuItem icon={<UserPlusIcon />}>Add Mentee</MenuItem>
        </SubMenu>
        <div className="divider my-0"></div>
        <MenuItem icon={<UsersIcon />} href="/users">
          User
        </MenuItem>
        <MenuItem icon={<BookOpenIcon />} href="/classes">
          Class
        </MenuItem>
        <MenuItem icon={<QueueListIcon />} href="/status">
          Status
        </MenuItem>
      </Menu>
      <div
        className={`absolute bottom-0 flex w-full p-3 ${
          collapsed ? "justify-center" : "justify-end"
        }`}
      >
        {collapsed ? (
          <ChevronDoubleRightIcon
            className="h-6 w-6"
            onClick={() => collapseSidebar()}
          />
        ) : (
          <ChevronDoubleLeftIcon
            className="h-6 w-6"
            onClick={() => collapseSidebar()}
          />
        )}
      </div>
    </Sidebar>
  );
};

export default Drawer;
