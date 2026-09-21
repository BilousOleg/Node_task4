import { NavLink } from 'react-router-dom';
import styles from './Logo.module.sass';

function Logo () {
  return (
    <NavLink to='/'>
      <article className={styles.logo}>
        <h2>Phones</h2>
        <p>CRUD</p>
      </article>
    </NavLink>
  );
}

export default Logo;
