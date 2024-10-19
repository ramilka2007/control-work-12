import { Box, Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/users/usersThunk';
import { API_URL } from '../../constants';

interface Props {
  user: User;
  googleAccount: boolean;
}

const UserMenu: React.FC<Props> = ({ user, googleAccount }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Box>
        <Button onClick={handleClick} className="text-white">
          Hello, {user.displayName ? user.displayName : user.username}!
          {googleAccount ? (
            <>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt=""
                  width="50px"
                  height="50px"
                  className="rounded-circle ms-2"
                />
              ) : null}
            </>
          ) : (
            <>
              {user.avatar ? (
                <img
                  src={API_URL + '/' + user.avatar}
                  alt=""
                  width="50px"
                  height="50px"
                  className="rounded-circle ms-2"
                />
              ) : null}
            </>
          )}
        </Button>

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={handleLogout}
            component={NavLink}
            className="text-decoration-none text-black"
            to="/login"
          >
            Log out
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default UserMenu;
