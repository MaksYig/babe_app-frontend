import HomePage from './layout/HomePage/HomePage';
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Register from './components/Registration/Register';
import Login from './components/Signin/Signin';
import UserPage from './layout/UserPage/userPage';
import UserSettings from './layout/UserSettings/UserSettings';
import UserProfile from './layout/UserProfile/UserProfile';
import AlertsToast from './components/Alert/Alert';
import InfoPage from './layout/InfoPage/InfoPage';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getProfile } from './redux/actions/auth';

function App() {
  const usersData = useSelector((state) => state);

  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <AlertsToast />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/user_page' element={<UserPage />} />
          <Route path='/info_page/:id' element={<InfoPage />} />
          <Route path='/user_settings' element={<UserSettings />} />
          <Route path='/user_profile' element={<UserProfile />} />
          <Route path='/login' element={<h1>Login Page</h1>} />
          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
