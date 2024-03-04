import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Container, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

function App() {
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
