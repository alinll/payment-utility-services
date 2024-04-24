import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import ServiceDetails from "../../features/catalog/ServiceDetails";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import RequireAuth from "./RequireAuth";
import GiveCounters from "../../features/account/GiveCounters";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {element: <RequireAuth />, children: [
        { path: 'checkout', element: <CheckoutPage /> }
      ]},
      { path: '', element: <Catalog /> },
      { path: 'catalog/:id', element: <ServiceDetails /> },
      { path: 'server-error', element: <ServerError /> },
      { path: 'not-found', element: <NotFound /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'basket', element: <BasketPage /> },
      { path: 'giveCounters/:id', element: <GiveCounters /> },
      { path: '*', element: <Navigate replace to='/not-found' /> }
    ]
  }
])