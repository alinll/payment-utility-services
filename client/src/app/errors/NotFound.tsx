import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return(
    <Container component={Paper} sx={{height: 400}}>
      <Typography gutterBottom variant='h3'>Нам не вдалося знайти те, що ви шукаєте</Typography>
      <Divider />
      <Button fullWidth component={Link} to='/'>Поверніться до магазину</Button>
    </Container>
  )
}