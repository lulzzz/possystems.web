import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    padding: 12,
  },
  input: {
    padding: '5px',
  },
});

const StyledTableCell = withStyles(() => ({
  root: {
    fontSize: '1rem',
  },
}))(TableCell);

const FlexTableCell = withStyles(theme => ({
  root: {
    fontSize: '1rem',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}))(TableCell);

const Row = props => {
  const { row, selected, labelid } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root} {...props}>
        {/*<StyledTableCell style={{ width: 30 }}>
                    {row.history.length > 0 ? (
                        <IconButton aria-label="expand row" size="small" onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    ) : null}
                </StyledTableCell>
                */}
        <StyledTableCell padding="checkbox" style={{ width: 30 }}>
          <Checkbox
            checked={selected}
            inputProps={{ 'aria-labelledby': labelid }}
          />
        </StyledTableCell>
        <FlexTableCell component="th" scope="row" style={{ width: 100 }}>
          {row.itemNumber}
        </FlexTableCell>
        <FlexTableCell style={{ width: 200 }}>{row.category}</FlexTableCell>
        <StyledTableCell style={{ width: 400 }}>{row.name}</StyledTableCell>
        <StyledTableCell align="right" style={{ maxWidth: 100 }}>
          <TextField
            id="filled-number"
            type="number"
            variant="filled"
            value={row.quantity}
            inputProps={{
              className: classes.input,
            }}
          />
        </StyledTableCell>
        <StyledTableCell align="right">{row.price}</StyledTableCell>
        <StyledTableCell align="right">{row.discount}</StyledTableCell>
        <StyledTableCell align="right">{row.subTotal()}</StyledTableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map(historyRow => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

Row.propTypes = {
  row: PropTypes.shape({
    itemNumber: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
  }).isRequired,
};

export default Row;
