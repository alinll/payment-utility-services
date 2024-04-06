import { LoadingButton } from "@mui/lab";
import { Container, Paper, Avatar, Typography, Box, TextField, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import agent from "../../app/api/agent";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
    mode: 'onTouched'
  });

  function handleApiErrors(errors: any) {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes('Password')) {
          setError('password', {message: error})
        } else if (error.includes('Email')) {
          setError('email', {message: error})
        } else if (error.includes('Username')) {
          setError('username', {message: error})
        } else if (error.includes('Прізвище')) {
          setError('lastname', {message: error})
        } else if (error.includes('Ім`я')) {
          setError('firstname', {message: error})
        } else if (error.includes('По-батькові')) {
          setError('midname', {message: error})
        }
      });
    }
  }

  return (
    <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Реєстрація
      </Typography>
      <Box 
      component="form" 
      onSubmit={handleSubmit((data) => agent.Account.register(data)
        .then(() => {
          toast.success('Реєстрація пройшла успішно. Тепер ви можете увійти в акаунт');
          navigate('/login');
        })
        .catch(error => handleApiErrors(error)))} 
      noValidate 
      sx={{ mt: 1 }}>
        <TextField
        margin="normal"
        required
        fullWidth
        label="Username"
        autoFocus
        {...register('username', {required: 'Введіть username'})}
        error={!!errors.username}
        helperText={errors?.username?.message as string}
        />
        <TextField
        margin="normal"
        required
        fullWidth
        label="Email"
        {...register('email', {
          required: 'Введіть email', 
          pattern: {
            value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
            message: 'Недійсний email'
          }
        })}
        error={!!errors.email}
        helperText={errors?.email?.message as string}
        />
        <TextField
        margin="normal"
        required
        fullWidth
        label="Прізвище"
        {...register('lastname', {required: 'Введіть прізвище'})}
        error={!!errors.lastname}
        helperText={errors?.lastname?.message as string}
        />
        <TextField
        margin="normal"
        required
        fullWidth
        label="Ім`я"
        {...register('firstname', {required: 'Введіть ім`я'})}
        error={!!errors.firstname}
        helperText={errors?.firstname?.message as string}
        />
        <TextField
        margin="normal"
        required
        fullWidth
        label="По-батькові"
        {...register('midname', {required: 'Введіть по-батькові'})}
        error={!!errors.midname}
        helperText={errors?.midname?.message as string}
        />
        <TextField
        margin="normal"
        required
        fullWidth
        label="Пароль"
        type="password"
        {...register('password', {
          required: 'Введіть пароль',
          pattern: {
            value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
            message: 'Пароль слабкий'
          }
        })}
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
          Зареєструватися
        </LoadingButton>
        <Grid item>
          <Link to='/login'>
            {"Вже маєте акаунт? Увійдіть"}
          </Link>
        </Grid>
      </Box>
    </Container>
  );
}