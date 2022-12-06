import { useState } from 'react';
import HomePage from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import './App.css';

function App() {
  const [loginDisplay, setLoginDisplay] = useState(false);

  return (
    <div className="App">
      {loginDisplay ? (
        <Login setLoginDisplay={setLoginDisplay} />
        ) : (
          <>
            <Header setLoginDisplay={setLoginDisplay} />
            <HomePage />
          </>
        )}
    </div>
  );
}

export default App;