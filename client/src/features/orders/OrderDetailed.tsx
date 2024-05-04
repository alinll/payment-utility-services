import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Order } from "../../models/order";

interface Props {
  order: Order;
  setSelectedOrder: (id: number) => void;
}

export default function OrderDetailed({ order, setSelectedOrder }: Props) {
  return (
      <>
          <Box display='flex' justifyContent='space-between'>
              <Typography sx={{ p: 2 }} gutterBottom variant='h4'>Платіж №{order.id} - {order.orderStatus}</Typography>
              <Button onClick={() => setSelectedOrder(0)} sx={{ m: 2 }} size='large' variant='contained'>Назад до сторінки платежів</Button>
          </Box>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Сервіс</TableCell>
            <TableCell align="right">Особовий рахунок</TableCell>
            <TableCell align="right">Ціна</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.orderItems.map(item => (
            <TableRow
              key={item.serviceId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{item.name}</TableCell>
              <TableCell align="right">{item.personalAccountId}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </>
  )
}