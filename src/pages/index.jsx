import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Profile from './Profile';
import NotFound from './NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/:username',
    element: <Profile />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
