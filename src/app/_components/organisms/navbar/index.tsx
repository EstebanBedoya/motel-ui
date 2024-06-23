'use client';

/** @package */
import AddBoxIcon from '@mui/icons-material/AddBox';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import HotelIcon from '@mui/icons-material/Hotel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { IconButton } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

/** @component */
import BrandLogoAtm from '../../atoms/brand-logo-atm';
import HeaderAppBar from '../../molecules/header-app-bar';
import { ROUTES } from '@/utils/routes';

const drawerWidth = 240;

export default function PermanentDrawerRight({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (pathname === ROUTES.LOGIN) return children;

  return (
    <Box sx={{ display: 'flex' }}>
      <HeaderAppBar handleDrawerOpen={handleDrawerOpen} open={open} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        open={open}
        variant="temporary"
      >
        <Toolbar sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
        >
          <BrandLogoAtm />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={pathname === ROUTES.DASHBOARD_ROOMS}
              onClick={() => router.push(ROUTES.DASHBOARD_ROOMS)}
              component="button"
            >
              <ListItemIcon>
                <HotelIcon />
              </ListItemIcon>
              <ListItemText primary="Habitaciones" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              selected={pathname === ROUTES.DASHBOARD_ROOMS_CREATE}
              onClick={() => router.push(ROUTES.DASHBOARD_ROOMS_CREATE)}
              component="button"
            >
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Crear Habitacion" />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, paddingTop: 5 }}
      >
        {children}
      </Box>
    </Box>
  );
}
