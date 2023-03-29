import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import axios from 'axios';

import Home from 'pages';
import Auth from 'pages/auth';
import User from 'pages/user';
import Class from 'pages/class';
import Status from 'pages/status';
import Mentee from 'pages/mentee';
import AddMentee from 'pages/mentee/AddMentee';
import EditMentee from 'pages/mentee/EditMentee';
import Log from 'pages/mentee/DetailMentee';
import NotFound from 'pages/NotFound';

axios.defaults.baseURL = 'https://dashboard.altapro.online/';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Auth />} />
        <Route path="/users" element={<User />} />
        <Route path="/classes" element={<Class />} />
        <Route path="/status" element={<Status />} />
        <Route path="/add-mentee" element={<AddMentee />} />
        <Route path="/mentees" element={<Mentee />} />
        <Route path="/mentees/:id_mentee" element={<Log />} />
        <Route path="/mentees/:id_mentee/edit" element={<EditMentee />} />
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <ProSidebarProvider>
      <RouterProvider router={router} />
    </ProSidebarProvider>
  );
};

export default App;
