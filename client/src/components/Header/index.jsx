import Logo from '../Logo';
import Navigation from '../Navigation';
import styles from './Header.module.sass';

function Header () {
  return (
    <header className={styles.header}>
      <Logo />
      <Navigation />
    </header>
  );
}

export default Header;
