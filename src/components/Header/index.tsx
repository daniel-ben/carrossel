import { app } from "../../firebaseInit";
import { getAuth } from "firebase/auth";
import './style.css'

interface iHeaderParams {
    setLoginDisplay: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Header({setLoginDisplay}: iHeaderParams) {
    const auth = getAuth(app);
    const user = auth.currentUser;

    return (
        <header className='header'>
            <h1 className='header__title'>Editora</h1>
            <nav className='header__nav'>
                <p className='nav__item nav__home'>Home</p>
                <p className='nav__item nav__perfil'
                    onClick={() => {
                        if(!user) setLoginDisplay(true);
                    } }
                >{user ? 'Perfil' : 'Login'}</p>
            </nav>
        </header>
    )
}