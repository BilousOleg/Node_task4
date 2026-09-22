import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Navigation.module.sass';

function Navigation () {
  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) =>
              classNames(styles.navLink, {
                [styles.active]: isActive,
              })
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/phones'
            className={({ isActive }) =>
              classNames(styles.navLink, {
                [styles.active]: isActive,
              })
            }
          >
            Phones
          </NavLink>
        </li>
        {/* Preorders */}
      </ul>
    </nav>
  );
}

export default Navigation;
