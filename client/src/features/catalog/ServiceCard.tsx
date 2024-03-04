import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Service } from "../../models/service";
import { Link } from "react-router-dom";

interface Props {
  service: Service;
}

export default function ServiceCard({service}: Props) {
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
        <Button component={Link} to={`/catalog/${service.id}`} size="small">View</Button>
        <Button size="small">Pay</Button>
      </CardActions>
      </Box>
    </Card>
  )
}