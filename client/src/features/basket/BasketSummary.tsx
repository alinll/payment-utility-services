import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useStoreContext } from "../../store/StoreContext";

export default function BasketSummary() {
  const { basket } = useStoreContext();
  const total = basket?.items.reduce((sum, item) => sum + item.price, 0).toFixed(2);
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