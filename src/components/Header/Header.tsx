import { Link, useLocation } from 'react-router';
import css from './Header.module.css';
import { LoginModal } from '../AuthForm/LoginForm';
import { RegisterModal } from '../AuthForm/RegisterForm';
import { useState } from 'react';

export function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  return (
    <header className={`${css.header} ${isHome ? css.headerHome : css.headerDefault}`}>
      <div className={css.container}>
        <div className={`${css.sidehead} ${css.lefthead}`}>
          <Link to="/" className={css.logo}>
            Nanny.Services
          </Link>
        </div>
        <div className={`${css.sidehead} ${css.righthead}`}>
          <nav className={css.nav}>
            <Link to="/" className={pathname === '/' ? css.activeLink : ''}>
              Home
            </Link>
            <Link to="/nannies" className={pathname === '/nannies' ? css.activeLink : ''}>
              Nannies
            </Link>
          </nav>

          <div className={css.authBtns}>
            <button type="button" className={css.loginBtn} onClick={() => setIsLoginOpen(true)}>
              Log In
            </button>
            <button
              type="button"
              className={css.registerBtn}
              onClick={() => setIsRegisterOpen(true)}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </header>
  );
}

export default Header;
