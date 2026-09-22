import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { getPhonesThunk } from '../../store/slices/phonesSlice';
import PhonesList from '../../components/PhonesList';
import styles from './PhonesPage.module.sass';

function PhonesPage () {
  const dispatch = useDispatch();

  const { phones } = useSelector(state => state.phones);

  useEffect(() => {
    dispatch(getPhonesThunk());
  }, [dispatch]);

  return (
    <section>
      <div className={styles.headingGroup}>
        <h1>Phones List</h1>
        <Link to='/phones/create' className={styles.addPhone}>
          <AddIcon />
          <span>ADD</span>
        </Link>
      </div>
      <PhonesList phones={phones} />
    </section>
  );
}

export default PhonesPage;
