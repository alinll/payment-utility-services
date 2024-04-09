import { Typography, Container, Box, Avatar, TextField, Grid, Paper } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../app/store/configureStore";
import { signInUser } from "./accountSlice";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
    mode: 'onTouched'
  });

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(signInUser(data));
      navigate(location.state?.from || '/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Вхід в акаунт
      </Typography>
      <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
        <TextField
        margin="normal"
        required
        fullWidth
        label="Email"
        autoFocus
        {...register('email', {required: 'Введіть email'})}
        error={!!errors.email}
        helperText={errors?.email?.message as string}
        />
        <TextField
        margin="normal"
        required
        fullWidth
        label="Пароль"
        type="password"
        {...register('password', {required: 'Введіть пароль'})}
        error={!!errors.password}
        helperText={errors?.password?.message as string}
        />
        <LoadingButton
        loading = {isSubmitting}
        disabled={!isValid}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        >
          Ввійти в акаунт
        </LoadingButton>
        <Grid item>
          <Link to='/register'>
            {"Немає акаунта? Зареєструйтеся"}
          </Link>
        </Grid>
      </Box>
    </Container>
  );
}