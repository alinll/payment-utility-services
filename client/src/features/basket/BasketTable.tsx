import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { removeBasketItemAsync } from "./basketSlice";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { BasketItem } from "../../models/basket";

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
  const { status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  return(
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Сервіс</TableCell>
            <TableCell align="right">Особовий рахунок</TableCell>
            <TableCell align="right">Ціна</TableCell>
            {isBasket &&
            <TableCell align="right"></TableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
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
              {isBasket &&
                <LoadingButton 
                loading={status === 'pendingRemoveItem' + item.serviceId + 'del'} 
                onClick={() => dispatch(removeBasketItemAsync({serviceId: item.serviceId, name: 'del'}))} 
                color='error'>
                  <Delete />
                </LoadingButton>
              }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}