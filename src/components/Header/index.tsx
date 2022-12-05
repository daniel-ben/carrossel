import './style.css'

export default function Header() {
    return (
        <header className='header'>
            <h1 className='header__title'>Editora</h1>
            <nav className='header__nav'>
                <p className='nav__item nav__home'>Home</p>
                <p className='nav__item nav__perfil'>Perfil</p>
            </nav>
        </header>
    )
}