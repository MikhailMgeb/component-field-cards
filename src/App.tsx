import { cnApp } from './App.classname';
import { UserList } from './components/UserList/UserList';

import './App.css';

const App = () => {

  return (
    <div className={cnApp()}>
      <UserList />
    </div>
  );
}

export { App };
