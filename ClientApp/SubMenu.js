import React, { Fragment } from 'react';
import compose from 'recompose/compose';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-admin';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Typography from '@material-ui/core/Typography';

const styles = {
  listItemText: {
    fontSize: '1rem',
  },
  sidebarIsOpen: {
    paddingLeft: 25,
    transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
  },
  sidebarIsClosed: {
    paddingLeft: 0,
    transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
  },
  icon: {
    color: deepOrange[600],
  },
};

export const OrangeListItemIcon = withStyles(
  styles,
)(({ classes, ...props }) => (
  <ListItemIcon className={classes.icon} {...props} />
));

export const OrangeListExpandMore = withStyles(
  styles,
)(({ classes, ...props }) => (
  <ExpandMore className={classes.icon} {...props} />
));

const SubMenu = ({
  handleToggle,
  sidebarIsOpen,
  isOpen,
  name,
  icon,
  classes,
  children,
  translate,
}) => (
  <Fragment>
    <ListItem dense button onClick={handleToggle} className={classes.listItem}>
      <OrangeListItemIcon style={{ minWidth: 40 }}>
        {isOpen ? <OrangeListExpandMore /> : icon}
      </OrangeListItemIcon>
      <ListItemText
        disableTypography
        primary={
          isOpen ? (
            <Typography type="body1" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
              {translate(name)}
            </Typography>
          ) : (
            ''
          )
        }
        secondary={
          isOpen ? (
            ''
          ) : (
            <Typography type="body1" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
              {translate(name)}
            </Typography>
          )
        }
        className={classes.listItemText}
      />
    </ListItem>
    <Collapse in={isOpen} timeout="auto" unmountOnExit>
      <List
        dense
        component="div"
        disablePadding
        className={
          sidebarIsOpen ? classes.sidebarIsOpen : classes.sidebarIsClosed
        }
      >
        {children}
      </List>
      <Divider />
    </Collapse>
  </Fragment>
);

const enhance = compose(withStyles(styles), translate);

export default enhance(SubMenu);
