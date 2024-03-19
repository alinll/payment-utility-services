import { useState, useEffect } from "react";
import { Service } from "../../models/service"
import ServiceList from "./ServiceList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function Catalog() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
    .then(services => setServices(services))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingComponent message="Завантаження сервісів..." />
  
  return(
    <>
      <ServiceList services={services}/>
    </>
  )
}