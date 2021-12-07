import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Notification,
  setSidebarVisibility,
  ComponentPropType,
} from 'react-admin';
import SalesAppBar from './SalesAppBar';

import Footer from './Footer';
import CalculationBar from './CalculationBar';
import Cart from './Cart';

import Hidden from '@material-ui/core/Hidden';
import AuthorizeDialog from './Dialogs/AuthorizeDialog';
import Button from '@material-ui/core/Button';
import PayDialog from './Dialogs/PayDialog';

import { usePermissions } from 'react-admin';

import '../../css/sales.css';

const Sales = ({ logout, title }) => {
  const [authorizeOpen, setAuthorizeOpen] = React.useState(false);
  const [payOpen, setPayOpen] = React.useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSidebarVisibility(true));
  }, [setSidebarVisibility]);

  const handleOverride = () => {
    if (!permissions?.includes('override')) {
      setAuthorizeOpen(true);
    } else {
      setPayOpen(false);
    }
  };

  const { permissions } = usePermissions();

  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <SalesAppBar
          title={title}
          logout={logout}
          style={{ backgroundColor: '#2196f3' }}
        />
        <div className={classes.contentWithSidebar}>
          <div className={classes.content}>
            <div className={classes.containerFluid}>
              <Cart className={classes.mainBar} />
              <div className={classes.sideBar}>
                <CalculationBar />
                <Button
                  className={classes.actionButton}
                  onClick={() => setPayOpen(true)}
                >
                  PAY
                </Button>
              </div>
            </div>
            <Hidden smDown>
              <Footer classNameName={classes.footer} />
            </Hidden>
          </div>
        </div>
        <AuthorizeDialog
          open={authorizeOpen}
          handleClose={() => setAuthorizeOpen(false)}
        />
        <PayDialog
          open={payOpen}
          handleClose={() => setPayOpen(false)}
          onOverride={handleOverride}
        />

        <Notification />
      </div>
    </div>
  );
};

Sales.propTypes = {
  logout: ComponentPropType,
};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1,
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    position: 'relative',
  },
  actionBar: {
    flex: 0.11,
  },
  actionButton: {
    color: '#000',
    width: '100%',
    fontSize: '1.2rem',
    backgroundColor: '#1de9b6',
    marginTop: '1.2em',
  },
  appFrame: {
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'auto',
  },
  sideBar: {
    marginBottom: 10,
    flex: 0.2,
    backgroundColor: '#cfd8dc',
    maxHeight: '20em',
  },
  containerFluid: {
    display: 'flex',
    flexDirection: 'row',
  },
  contentWithSidebar: {
    display: 'flex',
    flexGrow: 1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
    padding: theme.spacing(2),
    marginTop: '3em',
  },
  mainBar: {
    flex: 0.8,
    minWidth: 400,
    minHeight: 400,
    marginRight: 15,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  footer: {
    textAlign: 'center',
  },
}));

export default Sales;
