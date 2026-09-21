import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPhonesThunk } from '../../store/slices/phonesSlice';
import PhonesList from '../../components/PhonesList';
import styles from './PhonesPage.module.sass';

function PhonesPage () {
  const dispatch = useDispatch();

  const { phones } = useSelector(state => state.phones);

  useEffect(() => {
    dispatch(getPhonesThunk());
  }, []);

  return (
    <section className={styles.phones}>
      <PhonesList phones={phones} />
    </section>
  );
}

export default PhonesPage;
