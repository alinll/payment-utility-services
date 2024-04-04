import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Container, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { useCallback, useEffect, useState } from 'react';
import LoadingComponent from './LoadingComponent';
import { useAppDispatch } from '../store/configureStore';
import { fetchBasketAsync } from '../../features/basket/basketSlice';
import { fetchCurrentUser } from '../../features/account/accountSlice';

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  if (loading) return <LoadingComponent message='Запуск програми...' />

  return (
    <div>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <CssBaseline />
      <Header />
      <Container>
      <Outlet />
      </Container>
    </div>
  )
}

export default App
