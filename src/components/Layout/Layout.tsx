// import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Layout.module.css";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <div>
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
