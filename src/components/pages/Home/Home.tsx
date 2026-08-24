import { Link } from 'react-router';
import css from './Home.module.css';
import img from '../../../assets/icons.svg';

function Home() {
  return (
    <section className={css.home}>
      <div className={`${css.side} ${css.leftSide}`}>
        <h1 className={css.title}>
          Make Life Easier <br /> for the Family:
        </h1>
        <p className={css.subtitle}>Find Babysitters Online for All Occasions</p>
        <Link to="/nannies" className={css.getStartedBtn}>
          Get started
          <svg width={20} height={15} className={css.btnIcon}>
            <use href={`${img}#icon-arrow-right`} />
          </svg>
        </Link>
      </div>
      <div className={`${css.side} ${css.rightSide}`}>
        <div className={css.badge}>
          <div className={css.badgeIcon}>
            <svg width={30} height={30} className={css.badgeIconSvg}>
              <use href={`${img}#icon-check`} />
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
