import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";
import { fetchServiceAsync, servicesSelectors } from "./catalogSlice";

export default function ServiceDetails() {
  const { basket } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const service = useAppSelector(state => servicesSelectors.selectById(state, parseInt(id!)));
  const { status: serviceStatus } = useAppSelector(state => state.catalog);
  const item = basket?.items.find(i => i.serviceId === service?.id);
  const { user } = useAppSelector(state => state.account);

  useEffect(() => {
    if (!service && id) dispatch(fetchServiceAsync(parseInt(id)));
  }, [id, item, dispatch, service])

  function addToCart() {
    if (!service) return;
    if (!item) {
      dispatch(addBasketItemAsync({serviceId: service?.id}));
    }
  }

  if (serviceStatus.includes('pending')) return <LoadingComponent message="Завантаження сервісу..." />

  if (!service) return <NotFound />

  return(
    <Grid container justifyContent='center' alignItems='center'>
      <Grid item>
        <Typography variant='h3'>{service.name}</Typography>
        <Typography variant='h3'>Тариф:</Typography>
      </Grid>
      <Grid container spacing={2} justifyContent='center' alignItems='center'>
      <Grid item sx={{mt: 2}}>
        <Typography variant='h4'>
          Для фізичних осіб: {service.priceIndividual} грн/{service.measure.name}
        </Typography>
        <Typography variant='h4'>
          Для юридичних осіб: {service.priceLegal} грн/{service.measure.name}
        </Typography>
        </Grid>
      </Grid>
      {user && (<Grid container spacing={2} justifyContent='center' alignItems='center'>
      <Grid item xs={4} sx={{mt: 2}}>
          <LoadingButton 
          disabled={!!item}
          onClick={addToCart} 
          sx={{height: '55px'}} 
          color='primary' 
          size='large' 
          variant='contained' 
          fullWidth>
            Оплатити
          </LoadingButton>
        </Grid>
      </Grid>)}
    </Grid>
  )
}