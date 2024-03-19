import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useStoreContext } from "../../store/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";

export default function BasketPage() {
  const { basket, removeItem} = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: ''
  });

  function handleRemoveItem(serviceId: number, name: string) {
    setStatus({loading: true, name});
    agent.Basket.removeItem(serviceId)
    .then(() => removeItem(serviceId))
    .catch(error => console.log(error))
    .finally(() => setStatus({loading: false, name}));
  }

  if (!basket) return <Typography variant='h3'>Ваш кошик порожній</Typography>

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Service</TableCell>
            <TableCell align="right">Price</TableCell>
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
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">
                <LoadingButton 
                loading={status.loading && status.name === 'del' + item.serviceId} 
                onClick={() => handleRemoveItem(item.serviceId, 'del' + item.serviceId)} 
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