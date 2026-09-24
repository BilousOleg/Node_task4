import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Pagination from '@mui/material/Pagination';
import {
  deletePhoneThunk,
  getPhonesThunk,
} from '../../store/slices/phonesSlice';
import { showNotification } from '../../store/slices/notificationSlice';
import PhonesList from '../../components/PhonesList';
import styles from './PhonesPage.module.sass';

function PhonesPage () {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const page = Number(searchParams.get('page')) || 1;
  const results = Number(searchParams.get('results')) || 10;

  const {
    phones,
    pagination: { totalPages },
  } = useSelector(state => state.phones);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (!params.has('page')) {
      params.set('page', '1');
    }

    if (!params.has('results')) {
      params.set('results', '10');
    }

    if (
      params.get('page') !== searchParams.get('page') ||
      params.get('results') !== searchParams.get('results')
    ) {
      setSearchParams(params, { replace: true });
      return;
    }

    dispatch(
      getPhonesThunk({
        page,
        results,
      })
    );
  }, [searchParams, setSearchParams, dispatch, page, results]);

  const handlePageChange = (_, newPage) =>
    setSearchParams({
      page: String(newPage),
      results: String(results),
    });

  const handleDelete = async id => {
    try {
      await dispatch(deletePhoneThunk(id)).unwrap();

      dispatch(
        showNotification({
          message: 'Phone deleted successfully',
          type: 'success',
        })
      );

      if (phones.length === 1 && page > 1) {
        setSearchParams({
          page: String(page - 1),
          results: String(results),
        });
        return;
      }

      dispatch(
        getPhonesThunk({
          page,
          results,
        })
      );
    } catch (err) {
      dispatch(
        showNotification({
          message: err.errors[0].title,
          type: 'error',
        })
      );
    }
  };

  return (
    <section>
      <section className={styles.headingGroup}>
        <h1>Phones List</h1>
        <Link to='/phones/create' className={styles.addPhone}>
          <AddIcon />
          <span>ADD</span>
        </Link>
      </section>
      <section>
        <PhonesList phones={phones} onDelete={handleDelete} />
      </section>
      <section className={styles.paginationSection}>
        <Pagination
          count={totalPages}
          page={page}
          siblingCount={2}
          boundaryCount={1}
          onChange={handlePageChange}
        />
      </section>
    </section>
  );
}

export default PhonesPage;
