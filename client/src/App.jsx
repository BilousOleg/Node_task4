import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PhonesPage from './pages/PhonesPage';
import CreatePhonePage from './pages/CreatePhonePage';
import UpdatePhonePage from './pages/UpdatePhonePage';
import Notification from './components/Notification';
import { hideNotification } from './store/slices/notificationSlice';
import styles from './App.module.sass';

function App () {
  const dispatch = useDispatch();

  const { message, type } = useSelector(state => state.notification);

  return (
    <Router>
      <div className={styles.appWrapper}>
        <Header />
        <Notification
          message={message}
          type={type}
          onClose={() => dispatch(hideNotification())}
        />
        <main className={styles.main}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path='phones'>
              <Route index element={<PhonesPage />} />
              <Route path='create' element={<CreatePhonePage />} />
              <Route path='update/:id' element={<UpdatePhonePage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
