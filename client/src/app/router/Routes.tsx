import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import ServiceDetails from "../../features/catalog/ServiceDetails";
import ServerError from "../../errors/ServerError";
import NotFound from "../../errors/NotFound";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Catalog /> },
      { path: 'catalog/:id', element: <ServiceDetails /> },
      { path: 'server-error', element: <ServerError /> },
      { path: 'not-found', element: <NotFound /> },
      { path: '*', element: <Navigate replace to='/not-found' /> }
    ]
  }
])