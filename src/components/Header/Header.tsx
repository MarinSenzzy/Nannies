import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import css from './Header.module.css';
import { LoginModal } from '../AuthForm/LoginForm';
import { RegisterModal } from '../AuthForm/RegisterForm';
import { useAuth } from '../../hooks/useAuth';
import { logoutUser } from '../../services/authService';
import toast from 'react-hot-toast';

function Navigation() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={({ isActive }) => (isActive ? css.activeLink : '')}>
        Home
      </NavLink>
      <NavLink to="/nannies" className={({ isActive }) => (isActive ? css.activeLink : '')}>
        Nannies
      </NavLink>
      {!isHome && user && (
        <NavLink to="/favorites" className={({ isActive }) => (isActive ? css.activeLink : '')}>
          Favorites
        </NavLink>
      )}
    </nav>
  );
}

interface AuthButtonsProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

function AuthButtons({ onOpenLogin, onOpenRegister }: AuthButtonsProps) {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      const userName = user?.displayName;
      await logoutUser();
      toast.success(`Logout successful, ${userName}!`);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  if (user) {
    return (
      <div className={css.authBtns}>
        <div className={css.userInfo}>
          <div className={css.userAvatar}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4C13.0609 4 14.0783 4.42143 14.8284 5.17157C15.5786 5.92172 16 6.93913 16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12C10.9391 12 9.92172 11.5786 9.17157 10.8284C8.42143 10.0783 8 9.06087 8 8C8 6.93913 8.42143 5.92172 9.17157 5.17157C9.92172 4.42143 10.9391 4 12 4ZM12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z"
                fill="var(--accent)"
              />
            </svg>
          </div>
          <span className={css.userName}>{user.displayName || 'User'}</span>
        </div>

        <button type="button" className={css.logBtn} onClick={handleLogout}>
          Log out
        </button>
      </div>
    );
  }
  return (
    <div className={css.authBtns}>
      <button type="button" className={css.logBtn} onClick={onOpenLogin}>
        Log In
      </button>
      <button type="button" className={css.registerBtn} onClick={onOpenRegister}>
        Registration
      </button>
    </div>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <header className={`${css.header} ${isHome ? css.headerHome : css.headerDefault}`}>
      <div className={`${css.container} ${isHome ? css.containerHome : css.containerDefault}`}>
        {isHome ? (
          <>
            <div className={`${css.sidehead} ${css.lefthead}`}>
              <Link to="/" className={css.logo}>
                Nanny.Services
              </Link>
            </div>
            <div className={`${css.sidehead} ${css.righthead}`}>
              <Navigation />
              <AuthButtons
                onOpenLogin={() => setIsLoginOpen(true)}
                onOpenRegister={() => setIsRegisterOpen(true)}
              />
            </div>
          </>
        ) : (
          /* Лайаут для стандартних сторінок */
          <>
            <Link to="/" className={css.logo}>
              Nanny.Services
            </Link>
            <Navigation />
            <AuthButtons
              onOpenLogin={() => setIsLoginOpen(true)}
              onOpenRegister={() => setIsRegisterOpen(true)}
            />
          </>
        )}
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </header>
  );
}

export default Header;
