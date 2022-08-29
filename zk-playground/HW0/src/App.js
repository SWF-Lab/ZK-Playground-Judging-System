import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import ViewInArTwoToneIcon from '@mui/icons-material/ViewInArTwoTone';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Home } from "./components/Home";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GitHubIcon from '@mui/icons-material/GitHub';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'HW Designer & Testing Data © '}
      <Link color="inherit" href="https://medium.com/@ChiHaoLu/">
        ChiHaoLu
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#F1F0CC',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <ViewInArTwoToneIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            ZK-Playground (EF Grants)
          </Typography>
        </Toolbar>
      </AppBar>
      <Home /> 
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 4 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        ><IconButton sx={{ mr: 0 }} href="https://zkplayground.tw/" aria-label="home">
            <HomeIcon />
          </IconButton>
          <IconButton sx={{ mr: 2 }} href="https://hackmd.io/@ChiHaoLu/ZKPlayground-HW0" aria-label="home">
            <MenuBookIcon />
          </IconButton>
          <br/>
          This dapp is for the <b>ZK-Playground Homework 0</b> before 2022-8-28 0:00.
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}