import { useEffect, useState } from "react";
import { app } from "../../firebaseInit";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logout } from "../../pages/Login/controllers";
import { THeaderParams } from "../../interfaces";
import './style.css'


export default function Header({ setLoginDisplay, setActivePage }: THeaderParams) {
    const [menuDisplay, setMenuDisplay] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState<string>();

    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        if (user?.displayName) setUser(user.displayName);
    })

    return (
        <header className='header'>
            <h1 className='header__title'>Editora</h1>
            <nav className='header__nav'>

                {isAdmin ? (
                    <>
                        <p className='nav__item nav__home'
                            onClick={() => setActivePage('Home')}
                        >Home</p>
                        <p className="nav__item "
                            onClick={() => setActivePage('Admin')}
                        >Admin</p>
                    </>
                ) : (<></>)}

                {user ? (
                    <p className='nav__item nav__perfil'
                        onClick={() => { setMenuDisplay(!menuDisplay) }} >Perfil</p>
                ) : (
                    <p className='nav__item nav__perfil'
                        onClick={() => { if (!user) setLoginDisplay(true) }} >Login</p>
                )}
            </nav>

            <div className="perfil-menu" style={{ display: menuDisplay ? '' : 'none' }}>
                <p className="perfil-menu__item">{user ? user : 'username'}</p>

                <div className="perfil-menu__item perfil-menu__admin">
                    <label htmlFor="setAdmin" >Transforma em admin</label>
                    <input type='radio'
                        id="setAdmin"
                        checked={isAdmin}
                        onClick={() => setIsAdmin(!isAdmin)}
                        onChange={() => { }}
                    />
                </div>

                <p className="perfil-menu__item perfil-menu__logout"
                    onClick={() => {
                        logout();
                        setMenuDisplay(!menuDisplay);
                        setLoginDisplay(true);
                    }}
                >Logout</p>
            </div>
        </header>
    )
}