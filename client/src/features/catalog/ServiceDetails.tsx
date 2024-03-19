import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Service } from "../../models/service";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStoreContext } from "../../store/StoreContext";
import { LoadingButton } from "@mui/lab";

export default function ServiceDetails() {
  const { basket, setBasket } = useStoreContext();
  const { id } = useParams<{id: string}>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const item = basket?.items.find(i => i.serviceId === service?.id);

  useEffect(() => {
    id && agent.Catalog.details(parseInt(id))
    .then(response => setService(response))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }, [id])

  function addToCart() {
    if (!service) return;
    setSubmitting(true);
    if (!item) {
      agent.Basket.addItem(service.id)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setSubmitting(false))
    }
  }

  if (loading) return <LoadingComponent message="Завантаження сервісу..." />

  if (!service) return <NotFound />

  return(
    <Grid container spacing={6} justifyContent='center' alignItems='center'>
      <Grid item>
        <Typography variant='h3'>{service.name}</Typography>
      </Grid>
      <Grid container spacing={2} justifyContent='center' alignItems='center'>
      <Grid item xs={4} sx={{mt: 2}}>
          <LoadingButton 
          disabled={!!item}
          loading={submitting} 
          onClick={addToCart} 
          sx={{height: '55px'}} 
          color='primary' 
          size='large' 
          variant='contained' 
          fullWidth>
            Оплатити
          </LoadingButton>
        </Grid>
      </Grid>
    </Grid>
  )
}