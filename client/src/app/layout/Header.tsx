import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";

const links = [
  { title : 'Увійти в акаунт', path: '/login' },
  { title: 'Зареєструватися', path: '/register' }
]

const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
  '&:hover': {
    color: 'grey.500'
  }
}

export default function Header() {
  const { basket } = useAppSelector(state => state.basket);
  const { user } = useAppSelector(state => state.account);
  const dispatch = useAppDispatch();

  return(
    <AppBar position='static' sx={{mb: 4}}>
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box display='flex' alignItems='center'>
        <Typography variant='h6' component={NavLink} to={'/'} sx={navStyles}>
          Оплата комунальних послуг
        </Typography>
        </Box>
        <Box display='flex' alignItems='center'>
          {user && (
          <IconButton component={Link} to='/basket' size='large' edge='start' color='inherit' sx={{mr: 2}} onClick={() => {
            dispatch(fetchCurrentUser());
            dispatch(fetchBasketAsync());
          }}>
            <Badge badgeContent={basket?.items.length} color='secondary'>
              <ShoppingCart />
            </Badge>
          </IconButton>
        )}
        {user ? (
          <SignedInMenu />
        ) : (
          <List sx={{display: 'flex'}}>
            {links.map(({title, path}) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title}
            </ListItem>
            ))}
          </List>
        )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}