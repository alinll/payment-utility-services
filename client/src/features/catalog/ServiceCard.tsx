import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Service } from "../../models/service";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../store/StoreContext";

interface Props {
  service: Service;
}

export default function ServiceCard({service}: Props) {
  const [loading, setLoading] = useState(false);
  const { setBasket } = useStoreContext();

  function handleAddItem(serviceId: number) {
    setLoading(true);
    agent.Basket.addItem(serviceId)
    .then(basket => setBasket(basket))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }

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
        <Button component={Link} to={`/catalog/${service.id}`} size="small">Переглянути</Button>
        <LoadingButton loading={loading} onClick={() => handleAddItem(service.id)} size="small">Оплатити</LoadingButton>
      </CardActions>
      </Box>
    </Card>
  )
}