import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";

import Home from "pages";
import User from "pages/user";
import Class from "pages/class";
import Status from "pages/status";
import Mentee from "pages/mentee";
import Log from "pages/log"
import NotFound from "pages/NotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<User />} />
        <Route path="/classes" element={<Class />} />
        <Route path="/status" element={<Status />} />
        <Route path="/mentees" element={<Mentee />} />
        <Route path="/log" element={<Log />} />
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <ProSidebarProvider>
      <RouterProvider router={router} />
    </ProSidebarProvider>
  );
}

export default App;
