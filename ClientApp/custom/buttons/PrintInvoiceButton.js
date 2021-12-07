import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import ContentSave from '@material-ui/icons/Save';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { push } from 'connected-react-router';
import { showNotification } from 'react-admin';

const styles = {
  button: {
    fontWeight: 'bold',
    backgroundColor: lightBlue[600],
    color: '#fff',
    '&:hover': {
      backgroundColor: lightBlue[900],
    },
    marginRight: '0.5rem',
  },
};

const StyledButton = withStyles(styles)(({ classes, ...props }) => (
  <Button className={classes.button} {...props} variant="contained" />
));

class PrintInvoiceButton extends Component {
  state = {
    progressing: false,
  };

  handleClick = () => {
    const { record, showNotification } = this.props;

    this.setState({ progressing: true });
    showNotification('Printing invoice. Please wait...', 'info');

    //console.log(record.invoiceNo);
    jsWebClientPrint.print(`invoiceNo=${record.invoiceNo}`);

    this.setState({ progressing: false });
  };

  render() {
    const {
      state: { progressing },
    } = this;
    return (
      <StyledButton
        icon={
          progressing ? (
            <CircularProgress size={25} thickness={2} />
          ) : (
            <ContentSave />
          )
        }
        onClick={this.handleClick}
        variant="contained"
      >
        Print Invoice
      </StyledButton>
    );
  }
}

PrintInvoiceButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  showNotification,
  push,
})(PrintInvoiceButton);
