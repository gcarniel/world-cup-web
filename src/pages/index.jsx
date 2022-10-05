import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Home from './Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
