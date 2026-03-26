import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '../layout/RootLayout';
import { Home } from '../../pages/Home';
import { Mission, Cards, Impact, Contact } from '../../pages/BlankPages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'mission', element: <Mission /> },
      { path: 'cards', element: <Cards /> },
      { path: 'impact', element: <Impact /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
