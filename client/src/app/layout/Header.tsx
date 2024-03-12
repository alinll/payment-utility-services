import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

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
  return(
    <AppBar position='static' sx={{mb: 4}}>
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box display='flex' alignItems='center'>
        <Typography variant='h6' component={NavLink} to={'/'} sx={navStyles}>
          Оплата комунальних послуг
        </Typography>
        </Box>
        <Box display='flex' alignItems='center'>
        <IconButton size='large' edge='start' color='inherit' sx={{mr: 2}}>
          <Badge badgeContent='4' color='secondary'>
            <ShoppingCart />
          </Badge>
        </IconButton>
        <List sx={{display: 'flex'}}>
          {links.map(({title, path}) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title}
            </ListItem>
          ))}
        </List>
        </Box>
      </Toolbar>
    </AppBar>
  )
}