import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import Header from './components/Header';
import Login from './Login';
import './App.css';

function App() {
  const [loginDisplay, setLoginDisplay] = useState(false);
  const [activePage, setActivePage] = useState('Home');
  const [currentLivroId, setCurrentLivroId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (currentLivroId !== '') {
      setActivePage('Admin')
    }
  }, [currentLivroId])

  return (
    <div className="App">
      {loginDisplay ? (
        <Login setLoginDisplay={setLoginDisplay} />
      ) : (
        <>
          <Header setLoginDisplay={setLoginDisplay}
            setActivePage={setActivePage}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin} 
            setCurrentLivroId={setCurrentLivroId}
          />
          {activePage === 'Home' ? (
            <HomePage setCurrentLivroId={setCurrentLivroId} isAdmin={isAdmin} />
          ) : (
            <AdminPage 
              setActivePage={setActivePage} 
              currentLivroId={currentLivroId}  
              setCurrentLivroId={setCurrentLivroId}
              isAdmin={isAdmin} />
          )}
        </>
      )}
    </div>
  );
}

export default App;