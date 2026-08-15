import { Link } from "react-router";
import css from "./Home.module.css";

function Home() {
  return (
    <section className={css.home}>
      <div className={`${css.side} ${css.leftSide}`}>
        <h1 className={css.title}>
          Make Life Easier <br /> for the Family:
        </h1>
        <p className={css.subtitle}>
          Find Babysitters Online for All Occasions
        </p>
        <Link to="/nannies" className={css.getStartedBtn}>
          Get started
          <svg
            className={css.btnIcon}
            width="20"
            height="15"
            viewBox="0 0 20 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.7341 7.94655C19.1177 7.54927 19.1067 6.91621 18.7094 6.53256L12.2353 0.280632C11.838 -0.103017 11.205 -0.0919665 10.8213 0.305314C10.4377 0.702594 10.4487 1.33566 10.846 1.71931L16.6007 7.27658L11.0434 13.0313C10.6598 13.4286 10.6709 14.0616 11.0681 14.4453C11.4654 14.8289 12.0985 14.8179 12.4821 14.4206L18.7341 7.94655ZM0.0349085 8.56589L18.0322 8.25174L17.9973 6.25205L3.62657e-06 6.56619L0.0349085 8.56589Z"
              fill="#FBFBFB"
            />
          </svg>
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
