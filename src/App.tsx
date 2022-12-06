import { useState } from 'react';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import Header from './components/Header';
import Login from './Login';
import './App.css';

function App() {
  const [loginDisplay, setLoginDisplay] = useState(false);
  const [activePage, setActivePage] = useState('Home');

  return (
    <div className="App">
      {loginDisplay ? (
        <Login setLoginDisplay={setLoginDisplay} />
        ) : (
          <>
            <Header setLoginDisplay={setLoginDisplay} setActivePage={setActivePage} />
            {activePage === 'Home' ? (
              <HomePage />
            ) : (
              <AdminPage setActivePage={setActivePage} />
            )}
          </>
        )}
    </div>
  );
}

export default App;