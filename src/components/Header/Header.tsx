import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import css from './Header.module.css';
import { LoginModal } from '../AuthForm/LoginForm';
import { RegisterModal } from '../AuthForm/RegisterForm';
import { useAuth } from '../../hooks/useAuth';
import { logoutUser } from '../../services/authService';
import toast from 'react-hot-toast';
import img from '../../assets/icons.svg';

function Navigation({ onItemClick }: { onItemClick?: () => void }) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  return (
    <nav className={css.nav} onClick={onItemClick}>
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
      const errorMessage = error instanceof Error ? error.message : 'Unknown logout error';

      toast.error(errorMessage);
      // console.error('Logout error:', error);
    }
  };
  if (user) {
    return (
      <div className={`${css.authBtns} ${css.authUser}`}>
        <div className={css.userInfo}>
          <div className={css.userAvatar}>
            <svg width={24} height={24} className={css.userAvatarIcon}>
              <use href={`${img}#icon-icn_user`} />
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
interface BurgerButtonProps {
  menuOpen: boolean;
  setMenuOpen: () => void;
}
const BurgerButton = ({ menuOpen, setMenuOpen }: BurgerButtonProps) => (
  <button type="button" className={css.burgerBtn} onClick={setMenuOpen} aria-label="Toggle menu">
    <svg width={22} height={20} className={`${css.burgerIcon} ${menuOpen && css.active}`}>
      <use href={`${img}#icon-header-mob-menu`} />
    </svg>
  </button>
);
export function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  return (
    <header className={`${css.header} ${isHome ? css.headerHome : css.headerDefault}`}>
      <div className={` ${css.container} ${isHome ? css.containerHome : css.containerDefault}`}>
        {isHome ? (
          <>
            <div className={css.lefthead}>
              <Link to="/" className={css.logo}>
                Nanny.Services
              </Link>
            </div>
            <div className={css.righthead}>
              <Navigation />
              <AuthButtons
                onOpenLogin={() => setIsLoginOpen(true)}
                onOpenRegister={() => setIsRegisterOpen(true)}
              />
              <BurgerButton menuOpen={isMenuOpen} setMenuOpen={toggleMenu} />
            </div>
          </>
        ) : (
          <>
            <Link to="/" className={css.logo}>
              Nanny.Services
            </Link>
            <Navigation />
            <AuthButtons
              onOpenLogin={() => setIsLoginOpen(true)}
              onOpenRegister={() => setIsRegisterOpen(true)}
            />
            <BurgerButton menuOpen={isMenuOpen} setMenuOpen={toggleMenu} />
          </>
        )}
        {isMenuOpen && (
          <div className={css.mobileMenu}>
            <Navigation onItemClick={closeMenu} />
            <AuthButtons
              onOpenLogin={() => {
                setIsLoginOpen(true);
                closeMenu();
              }}
              onOpenRegister={() => {
                setIsRegisterOpen(true);
                closeMenu();
              }}
            />
          </div>
        )}
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </header>
  );
}

export default Header;
