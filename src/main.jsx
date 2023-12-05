import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { Tab, Tabs } from 'react-bootstrap';

import App from './App';
import Home from './components/Home';
import Error from './components/Error';
import CustomerList from './components/CustomerList';
import TrainingsList from './components/TrainingsList';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: 'CustomerList',
        element: <CustomerList />,
      },
      {
        path: 'TrainingsList',
        element: <TrainingsList />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

// eslint-disable-next-line react-refresh/only-export-components
const AppWithTabs = () => (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// Render the app with Bootstrap tabs
const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <Tabs defaultActiveKey="home" id="main-tabs">
    <Tab eventKey="home" title="Home">
      <AppWithTabs />
    </Tab>
    <Tab eventKey="customerList" title="Customer List">
      <CustomerList />
    </Tab>
    <Tab eventKey="trainingsList" title="Trainings List">
      <TrainingsList />
    </Tab>
  </Tabs>,
);
