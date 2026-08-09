import { Link } from "react-router";
import css from "./Header.module.css";

function Header() {
  return (
    <>
      {/* <header className={css.homeheader}>
        <div
          className={`container 
          
          `}
          // ${css.headerwrapper}
        >
          <Link to="/" className={css.logo}>
            Nanny.Services
          </Link>

          <nav className={css.nav}>
            <Link to="/">Home</Link>
            <Link to="/nannies">Nannies</Link>
          </nav>
        </div>
      </header> */}
    </>
  );
}

export default Header;
