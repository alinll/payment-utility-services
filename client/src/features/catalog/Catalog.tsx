import { useEffect } from "react";
import ServiceList from "./ServiceList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchServicesAsync, servicesSelectors } from "./catalogSlice";

export default function Catalog() {
  const services = useAppSelector(servicesSelectors.selectAll);
  const { servicesLoaded, status } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!servicesLoaded) dispatch(fetchServicesAsync());
  }, [servicesLoaded, dispatch])

  if (status.includes('pending')) return <LoadingComponent message="Завантаження сервісів..." />
  
  return(
    <>
      <ServiceList services={services}/>
    </>
  )
}