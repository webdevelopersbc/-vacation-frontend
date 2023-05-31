
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import AddVacation from './components/addVacation';
import Vacations from './components/vacations';
import AdminVacations from './components/admin';
import Home from './components/home';
import UserHome from './components/userHome';

function App(): JSX.Element {
  const user: any = localStorage.getItem('user');
  const currentUser = JSON.parse(user);
  console.log(currentUser)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* {currentUser == null && <Route path="/" element={<Login />} />}
        {currentUser && (
          <> */}
        <Route path="/register" element={<Register />} />
        <Route path="/add-vacation" element={<AddVacation />} />
        <Route path="/edit-vacation/:id" element={<AddVacation />} />
        <Route path="/vacations" element={<Vacations />} />
        <Route path="/admin-vacations" element={<AdminVacations />} />
        <Route path="/admin-home" element={<Home />} />
        <Route path="/user-home" element={<UserHome />} />
        {/*  </>
        )} */}
      </Routes>
    </Router>
  );
}

export default App;
