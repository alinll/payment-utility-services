import { Typography, Grid, TextField, FormControlLabel, Checkbox, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PaymentForm() {
  const navigate = useNavigate();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Оплата
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Ім'я власника карти"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Номер карти"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Термін придатності"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
            <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Зберегти дані карти"
          />
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button
            variant="contained"
            onClick={() => {
              navigate('/savedOrder')
            }}
          >
            Оплатити
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}