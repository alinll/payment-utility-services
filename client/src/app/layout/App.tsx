import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Container, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { useEffect, useState } from 'react';
import { getCookie } from '../util/util';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useAppDispatch } from '../store/configureStore';
import { setBasket } from '../../features/basket/basketSlice';

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = getCookie('userId');

    if (userId) {
      agent.Basket.get()
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch])

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
