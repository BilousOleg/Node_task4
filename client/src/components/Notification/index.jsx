import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from './Notification.module.sass';

function Notification ({ message, type, onClose }) {
  const { isVisible } = useSelector(state => state.notification);

  useEffect(() => {
    const timerId = setTimeout(() => {
      onClose();
    }, 4000);

    return () => {
      clearTimeout(timerId);
    };
  }, [onClose]);

  return (
    <div
      className={classNames(styles.notification, styles[type], {
        [styles.isActive]: isVisible,
      })}
    >
      <span>{message}</span>

      <button className={styles.closeBtn} onClick={onClose}>
        x
      </button>
    </div>
  );
}

export default Notification;
