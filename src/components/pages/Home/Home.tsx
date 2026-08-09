import { Link } from "react-router";
import css from "./Home.module.css";

function Home() {
  return (
    <section className={css.home}>
      <div className={`${css.side} ${css.leftSide}`}>
        <h1 className={css.title}>Make Life Easier for the Family:</h1>
        <p className={css.subtitle}>
          Find Babysitters Online for All Occasions
        </p>
        <Link to="/nannies" className={css.getStartedBtn}>
          Get started
          {/* <span className={css.arrow}>↗</span> */}
        </Link>
      </div>
      <div className={`${css.side} ${css.rightSide}`}>
        <div className={css.badge}>
          <div className={css.badgeIcon}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.5 12.5L5 15L12.5 22.5L25 10L22.5 7.5L12.5 17.5L7.5 12.5Z"
                fill="#FBFBFB"
              />
            </svg>
          </div>
          <div className={css.badgeText}>
            <span className={css.badgeTitle}>Experienced nannies</span>
            <strong className={css.badgeValue}>15,000</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
