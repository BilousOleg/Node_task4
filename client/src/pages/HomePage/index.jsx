import styles from './HomePage.module.sass';

function HomePage () {
  return (
    <section className={styles.home}>
      <h1>
        Welcome to Phones <span>CRUD</span>
      </h1>
    </section>
  );
}

export default HomePage;
