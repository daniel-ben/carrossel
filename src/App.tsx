import { useState } from 'react';
import HomePage from './pages/Home';
import Admin from './pages/Admin';
import Header from './components/Header';
import Login from './pages/Login';
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
              <Admin setActivePage={setActivePage} />
            )}
          </>
        )}
    </div>
  );
}

export default App;