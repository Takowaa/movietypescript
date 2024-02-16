import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Homepage from '../Pages/Homepage';
import MovieDetails from '../Pages/MovieDetails';
import Medical from '../Pages/Medical';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/movie/:id',
        element: <MovieDetails />,
      },
      {
        path: '/medical',
        element: <Medical />,
      },
    ],
  },
]);
