import {
  HomeIcon,
  UsersIcon,
  BookOpenIcon,
  QueueListIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const Drawer = () => {
  return (
    <Sidebar
      backgroundColor={"#152C59"}
      style={{
        borderRight: "5px solid #243a63",
      }}
      breakPoint="md"
    >
      <Menu
        renderMenuItemStyles={({ active }) => ({
          ".menu-icon": {
            width: "1.5rem",
            minWidth: "1.5rem",
            height: "1.5rem",
          },
          ".menu-anchor": {
            backgroundColor: active ? "#313741" : "initial",
            color: "#94A3B8",
          },
          ".sub-menu-content": {
            backgroundColor: "#152C59",
            padding: "0px",
          },
        })}
      >
        <MenuItem href="/" icon={<HomeIcon />}>
          Dashboard
        </MenuItem>
        <SubMenu label="Mentee" icon={<UserCircleIcon />}>
          <MenuItem>Mentee List</MenuItem>
          <MenuItem>Add Mentee</MenuItem>
        </SubMenu>
        <div className="divider my-0"></div>
        <MenuItem icon={<UsersIcon />}>User</MenuItem>
        <MenuItem icon={<BookOpenIcon />}>Class</MenuItem>
        <MenuItem icon={<QueueListIcon />}>Status</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default Drawer;
