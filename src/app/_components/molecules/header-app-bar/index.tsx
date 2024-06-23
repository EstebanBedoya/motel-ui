'use client';

/** @packages */
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

/** @component */
import BrandLogoAtm from '@/app/_components/atoms/brand-logo-atm';

const actions = ['Profile', 'Logout'];

/** @Interfaces */
interface IHeaderAppBar {
  open: boolean;
  handleDrawerOpen: () => void;
}

const HeaderAppBar = ({ open, handleDrawerOpen }: IHeaderAppBar) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = async (actionSelected: string) => {
    if (actionSelected === 'Logout') {
      await signOut();
    }

    setAnchorElUser(null);
  };

  return (
    <AppBar
      color="inherit"
      sx={{ borderBottom: '2px solid #0054A3' }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { visibility: 'hidden' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <BrandLogoAtm />
        <Box>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar>M</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {actions.map((action, index, arr) => (
              <MenuItem
                key={action}
                onClick={() => handleCloseUserMenu(action)}
              >
                <Typography
                  color={index === arr.length - 1 ? 'red' : 'black'}
                  textAlign="center"
                >
                  {action}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAppBar;
