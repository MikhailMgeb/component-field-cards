import React from 'react';

import { cnApp } from './App.classname';
import UserList from './components/UserList/UserList';

import './App.css';



const App = () => {
  return (
    <div className={cnApp()}>
      <input />
      <UserList />
    </div>
  );
}

export { App };
