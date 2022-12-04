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
    <Sidebar backgroundColor="#152C59" customBreakPoint="1024px">
      <img className="mx-auto p-2" src="/ALTA-WHITE.png" alt="logo alta" />
      <Menu
        rootStyles={{
          [`.${menuClasses.button}`]: {
            '&:hover': {
              backgroundColor: '#2a3d61',
              color: '#EF6236',
            },
          },
        }}
        menuItemStyles={{
          icon: () => {
            return {
              width: '1.5rem',
              minWidth: '1.5rem',
              height: '1.5rem',
              marginRight: '1.5rem',
            };
          },
          button: ({ active, disabled }) => {
            return {
              color: disabled ? '#666' : active ? '#EF6236' : '#fff',
              backgroundColor: active ? '#2a3d61' : '#152C59',
            };
          },
        }}
      >
        <div className="divider my-0"></div>
        <MenuItem
          active={pathname.includes('/home')}
          icon={<HomeIcon />}
          href="/home"
        >
          Dashboard
        </MenuItem>
        <SubMenu
          defaultOpen={pathname.includes('mentee')}
          label="Mentee"
          icon={<UserCircleIcon />}
        >
          <MenuItem
            active={pathname.includes('/mentees')}
            icon={<UserGroupIcon />}
            href="/mentees"
          >
            Mentee List
          </MenuItem>
          <MenuItem
            active={pathname.includes('/add-mentee')}
            icon={<UserPlusIcon />}
            href="/add-mentee"
          >
            Add Mentee
          </MenuItem>
        </SubMenu>
        <div className="divider my-0"></div>
        <MenuItem
          active={pathname.includes('/users')}
          icon={<UsersIcon />}
          href="/users"
        >
          User
        </MenuItem>
        <MenuItem
          active={pathname.includes('/classes')}
          icon={<BookOpenIcon />}
          href="/classes"
        >
          Class
        </MenuItem>
        <MenuItem
          active={pathname.includes('/status')}
          icon={<QueueListIcon />}
          href="/status"
        >
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
