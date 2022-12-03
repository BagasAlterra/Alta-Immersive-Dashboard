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
} from '@heroicons/react/24/outline';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  menuClasses,
} from 'react-pro-sidebar';
import { useLocation } from 'react-router-dom';

const Drawer = () => {
  const { collapseSidebar, collapsed } = useProSidebar();
  const { pathname } = useLocation();

  return (
    <Sidebar backgroundColor={'#152C59'} customBreakPoint="1024px">
      <img className="mx-auto p-2" src="/ALTA-WHITE.png" alt="logo alta" />
      <Menu
        rootStyles={{
          [`.${menuClasses.icon}`]: {
            width: '1.5rem',
            minWidth: '1.5rem',
            height: '1.5rem',
            marginRight: '1.5rem',
          },
          [`.${menuClasses.button}`]: {
            color: '#fff',
            backgroundColor: '#152C58',
            '&:hover': {
              backgroundColor: '#2a3d61',
            },
          },
        }}
      >
        <div className="divider my-0"></div>
        <MenuItem icon={<HomeIcon />} href="/home">
          Dashboard
        </MenuItem>
        <SubMenu
          open={pathname.includes('mentee')}
          label="Mentee"
          icon={<UserCircleIcon />}
        >
          <MenuItem icon={<UserGroupIcon />} href="/mentees">
            Mentee List
          </MenuItem>
          <MenuItem icon={<UserPlusIcon />} href="/add_mentee">
            Add Mentee
          </MenuItem>
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
          collapsed ? 'justify-center' : 'justify-end'
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
