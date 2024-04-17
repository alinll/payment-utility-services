import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Service } from "../../models/service";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";
import { fetchServiceAsync } from "./catalogSlice";

interface Props {
  service: Service;
}

export default function ServiceCard({service}: Props) {
  const { status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.account);

  return(
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={service.pictureUrl}
        title={service.name}
      />
      <Box>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {service.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/catalog/${service.id}`} size="small" onClick={() => {dispatch(fetchServiceAsync(service.id))}}>Тариф</Button>
        {user && (
        <LoadingButton 
          loading={status.includes('pendingAddItem' + service.id)} 
          onClick={() => dispatch(addBasketItemAsync({serviceId: service.id}))} 
          size="small">
            Оплатити
          </LoadingButton>
        )}
      </CardActions>
      </Box>
    </Card>
  )
}