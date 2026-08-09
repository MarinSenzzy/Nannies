// import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import css from "./Layout.module.css";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <div className={css.layout}>
        <Header />
        <main>
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default Layout;
