import { Box, Button, CardActions, Container, Paper, TextField, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { servicesSelectors, fetchServiceAsync } from "../catalog/catalogSlice";
import { toast } from "react-toastify";
import { addBasketItemAsync } from "../basket/basketSlice";

export default function GiveCounters() {
  const { basket } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const service = useAppSelector(state => servicesSelectors.selectById(state, parseInt(id!)));
  const item = basket?.items.find(i => i.serviceId === service?.id);
  const [previousCounter, setPreviousCounter] = useState<number>(0);
  const [currentCounter, setCurrentCounter] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!service && id) dispatch(fetchServiceAsync(parseInt(id)));
  }, [id, item, dispatch, service])
  
  return(
  <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
    <Typography component="h1" variant="h5">
      Показники лічильника
    </Typography>
    <Box sx={{ mt: 1 }}>
      <TextField
      label="Попередній лічильник"
      value={previousCounter}
      onChange={(e) => setPreviousCounter(parseInt(e.target.value) || 0)}
      />
      <TextField
      label="Поточний лічильник"
      value={currentCounter}
      onChange={(e) => setCurrentCounter(parseInt(e.target.value) || 0)}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardActions>
        <Button
        onClick={() => {
          try {
            agent.Account.giveCounters(service.id, previousCounter, currentCounter);

            if (!(previousCounter < 0 || currentCounter < 0 || previousCounter > currentCounter))
              {
                dispatch(addBasketItemAsync({serviceId: service.id}));
                navigate(location.state?.from || '/');
              }
          } catch (error: any) {
            toast.error(error.data);
          }
        }} 
        size="small">
          Додати у кошик
        </Button>
      </CardActions>
      </Box>
    </Box>
  </Container>
  )
}