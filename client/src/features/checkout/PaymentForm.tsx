import { Typography, Grid, TextField, FormControlLabel, Checkbox, Box } from "@mui/material";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { clearBasket } from "../basket/basketSlice";
import { LoadingButton } from "@mui/lab";

export default function PaymentForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onTouched'
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  async function submitForm(data: FieldValues) {
    setLoading(true);

    try {
      await agent.Orders.create();
      dispatch(clearBasket());
      setLoading(false);

      await console.log(data);
      navigate('/savedOrder');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Оплата
      </Typography>
      <Grid container spacing={3} component="form" onSubmit={handleSubmit(submitForm)} >
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Ім'я власника карти"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            {...register('cardName', {required: 'Введіть ім`я власника карти'})}
            error={!!errors.cardName}
            helperText={errors?.cardName?.message as string}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="cardNumber"
            label="Номер карти"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="expDate"
            label="Термін придатності"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
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
            <LoadingButton
            loading={loading}
            variant="contained"
            disabled={!isValid}
            type='submit'
          >
            Оплатити
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}