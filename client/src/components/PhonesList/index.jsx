import PhonesListItem from './PhonesListItem';
import styles from './PhonesList.module.sass';

function PhonesList ({ phones }) {
  return (
    <ul className={styles.phonesList}>
      {phones.map(p => (
        <PhonesListItem
          key={p.id}
          id={p.id}
          model={p.model}
          brand={p.brand}
          manufacturedYear={p.manufacturedYear}
          ramSize={p.ramSize}
          hasNfc={p.hasNfc}
          image={p.image}
        />
      ))}
    </ul>
  );
}

export default PhonesList;
