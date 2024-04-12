import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";

export default function BasketSummary() {
  const { basket } = useAppSelector(state => state.basket);
  const total = basket?.items.reduce((sum, item) => sum + item.priceIndividual, 0).toFixed(2);

  return (
      <>
          <TableContainer component={Paper} variant={'outlined'}>
              <Table>
                  <TableBody>
                      <TableRow>
                          <TableCell colSpan={2}>Разом</TableCell>
                          <TableCell align="right">{total}</TableCell>
                      </TableRow>
                  </TableBody>
              </Table>
          </TableContainer>
      </>
  )
}