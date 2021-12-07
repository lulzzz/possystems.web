import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const styles = {
  grow: {
    flexGrow: 1,
  },
};

const SalesAppBar = props => (
  <AppBar {...props}>
    <Toolbar style={{ minHeight: 48 }}>
      <Typography style={{ marginLeft: 48 }} variant="h6">
        POSSystems v3
      </Typography>
      <NavLink to="/" style={{ marginLeft: 15, color: '#fff' }}>
        <Button>Dashboard</Button>
      </NavLink>
      <div style={styles.grow} />
      <div>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
        >
          <ExitToAppIcon />
        </IconButton>
      </div>
    </Toolbar>
  </AppBar>
);

export default SalesAppBar;
