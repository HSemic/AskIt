import * as React from 'react';
import { makeStyles } from '@mui/styles';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Logo from '../atoms/Logo';
import LinkButton from '../atoms/LinkButton';
import ButtonGroup from '../molecules/ButtonGroup';
import ProfileMenu from '../molecules/ProfileMenu';

import logo from '../../images/logo.png';

import { useAuth } from '../providers/AuthProvider';

const useStyles = makeStyles({
  appBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8) !important'
  }
});

const config = {
  logoText: 'AskIt',
  buttonSignInText: 'Log In',
  buttonSignUpText: 'Sign Up'
};

const Navbar = (): React.ReactElement => {
  const classes = useStyles();

  const { loggedIn } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <Logo text={config.logoText} imgSrc={logo} />

          <ButtonGroup direction="row" gap={1}>
            {!loggedIn ? (
              <>
                <LinkButton
                  text={config.buttonSignInText}
                  color="primary"
                  href="login"
                />
                <LinkButton
                  text={config.buttonSignUpText}
                  color="secondary"
                  href="register"
                />
              </>
            ) : (
              <ProfileMenu />
            )}
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
