import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import AddVacation from './components/addVacation';
import Vacations from './components/vacations';
import AdminVacations from './components/admin';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-vacation" element={<AddVacation />} />
        <Route path="/vacations" element={<Vacations />} />
        <Route path="/admin-vacations" element={<AdminVacations />} />
      </Routes>
    </Router>
  );
}

export default App;