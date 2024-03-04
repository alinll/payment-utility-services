import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Service } from "../../models/service";
import agent from "../../api/agent";
import NotFound from "../../errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function ServiceDetails() {
  const { id } = useParams<{id: string}>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    id && agent.Catalog.details(parseInt(id))
    .then(response => setService(response))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }, [id])

  if (loading) return <LoadingComponent message="Loading service..." />

  if (!service) return <NotFound />

  return(
    <Grid container spacing={6} justifyContent='center' alignItems='center'>
      <Grid item>
        <Typography variant='h3'>{service.name}</Typography>
      </Grid>
    </Grid>
  )
}