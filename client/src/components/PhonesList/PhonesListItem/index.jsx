import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import defaultImage from '../defaultImage.jpg';
import styles from './PhonesListItem.module.sass';

function PhonesListItem ({
  id,
  model,
  brand,
  manufacturedYear,
  ramSize,
  hasNfc,
  image,
  onDelete,
}) {
  return (
    <li className={styles.item}>
      {/* TODO individual phone page */}
      <div className={styles.card}>
        <Link to={'https://www.google.com/'} className={styles.info}>
          <div className={styles.imageWrapper}>
            <img
              src={
                image ? `http://localhost:5000/images/${image}` : defaultImage
              }
              alt={`${brand} ${model}`}
            />
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>
              {brand} {model}
            </h2>
            <ul className={styles.details}>
              <li className={styles.detail}>
                <span className={styles.label}>Year</span>
                <span className={styles.value}>{manufacturedYear}</span>
              </li>
              <li className={styles.detail}>
                <span className={styles.label}>RAM</span>
                <span className={styles.value}>{ramSize} MB</span>
              </li>
              <li className={styles.detail}>
                <span className={styles.label}>NFC</span>
                <span className={styles.value}>{hasNfc ? 'Yes' : 'No'}</span>
              </li>
            </ul>
          </div>
        </Link>
        <div className={styles.actions}>
          <Link to={`/phones/update/${id}`} className={styles.editButton}>
            <EditIcon />
            <span>Edit</span>
          </Link>

          <button
            className={styles.deleteButton}
            onClick={() => {
              onDelete(id);
            }}
          >
            <DeleteIcon />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </li>
  );
}

export default PhonesListItem;
