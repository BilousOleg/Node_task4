import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.sass';

function Navigation () {
  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/phones'>Phones</NavLink>
        </li>
        {/* Preorders */}
      </ul>
    </nav>
  );
}

export default Navigation;
