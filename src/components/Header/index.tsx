import { useState } from "react";
import { app } from "../../firebaseInit";
import { getAuth } from "firebase/auth";
import { logout } from "../../pages/Login/controllers";
import './style.css'

interface iHeaderParams {
    setLoginDisplay: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Header({ setLoginDisplay }: iHeaderParams) {
    const auth = getAuth(app);
    const user = auth.currentUser;

    const [menuDisplay, setMenuDisplay] = useState(false)

    return (
        <header className='header'>
            <h1 className='header__title'>Editora</h1>
            <nav className='header__nav'>
                <p className='nav__item nav__home'>Home</p>
                {user ? (
                    <p className='nav__item nav__perfil'
                        onClick={() => { setMenuDisplay(!menuDisplay) }} >Perfil</p>
                ) : (
                    <p className='nav__item nav__perfil'
                        onClick={() => { if (!user) setLoginDisplay(true) }} >Login</p>
                )}
            </nav>

            <div className="perfil-menu" style={{display: menuDisplay ? '' : 'none'}}>
                <p className="perfil-menu__item">{user ? user.displayName : 'username'}</p>
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