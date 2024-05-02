import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { removeBasketItemAsync } from "./basketSlice";

export default function BasketPage() {
  const { basket, status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  if (!basket) return <Typography variant='h3'>Ваш кошик порожній</Typography>

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Сервіс</TableCell>
            <TableCell align="right">Особовий рахунок</TableCell>
            <TableCell align="right">Ціна</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map(item => (
            <TableRow
              key={item.serviceId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display='flex' alignItems='center'>
                  <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}} />
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">{item.personalAccountId}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">
                <LoadingButton 
                loading={status === 'pendingRemoveItem' + item.serviceId + 'del'} 
                onClick={() => dispatch(removeBasketItemAsync({serviceId: item.serviceId, name: 'del'}))} 
                color='error'>
                  <Delete />
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Grid container>
      <Grid item xs={6} />
      <Grid item xs={6}>
        <BasketSummary />
        <Button component={Link} to='/checkout' variant='contained' size='large' fullWidth>Оформити</Button>
      </Grid>
    </Grid>
    </>
  );
}