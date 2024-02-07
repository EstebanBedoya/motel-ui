"use client";
/** @packages */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { signOut } from "next-auth/react";

/** @component */
import BrandLogoAtm from "@/components/atoms/brand-logo-atm";

const actions = ["Profile", "Logout"];

const HeaderAppBar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = async (actionSelected: string) => {
    if (actionSelected === "Logout") {
      await signOut();
    }
  
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={{ borderBottom: "2px solid #0054A3" }}
    >
      <Toolbar sx={{ justifyContent: "space-between"}}>
        <BrandLogoAtm />
        <Box>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar>M</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
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
                  color={index === arr.length - 1 ? "red" : "black"}
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
