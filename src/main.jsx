import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { Tab, Tabs } from 'react-bootstrap';

import App from './App';
import Home from './components/Home';
import CustomerList from './components/CustomerList';
import TrainingsList from './components/TrainingsList';

// eslint-disable-next-line react-refresh/only-export-components
const AppWithRouter = () => (
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/"
          element={<App />}
        >
          <Route
            index
            element={<Home />}
          />
          <Route
            path="customerList"
            element={<CustomerList />}
          />
          <Route
            path="trainingsList"
            element={<TrainingsList />}
          />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <Tabs defaultActiveKey="home" id="main-tabs">
    <Tab eventKey="home" title="Home">
      <AppWithRouter />
    </Tab>
    <Tab eventKey="customerList" title="Customer List">
      <CustomerList />
    </Tab>
    <Tab eventKey="trainingsList" title="Trainings List">
      <TrainingsList />
    </Tab>
  </Tabs>
);
