import { Link, useLocation } from 'react-router';
import css from './Header.module.css';

export function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

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
            <button type="button" className={css.loginBtn}>
              Log In
            </button>
            <button type="button" className={css.registerBtn}>
              Registration
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
