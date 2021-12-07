import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';

const StyledTableCell = withStyles(theme => ({
  root: {
    fontSize: 18,
  },
  head: {
    backgroundColor: '#00838F',
    color: theme.palette.common.white,
  },
}))(TableCell);

const FlexTableCell = withStyles(theme => ({
  root: {
    fontSize: 18,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  head: {
    backgroundColor: '#00838F',
    color: theme.palette.common.white,
  },
}))(TableCell);

const headCells = [
  {
    id: 'itemNumber',
    numeric: false,
    disablePadding: true,
    label: 'Item Number',
    flexible: true,
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Item Type',
    flexible: true,
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    flexible: false,
  },
  {
    id: 'quantity',
    numeric: true,
    disablePadding: false,
    label: 'Quantity',
    flexible: false,
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
    flexible: false,
  },
  {
    id: 'discount',
    numeric: true,
    disablePadding: false,
    label: 'Discount',
    flexible: false,
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Total',
    flexible: false,
  },
];

const EnhancedTableHead = props => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/*<StyledTableCell />
         */}
        <StyledTableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </StyledTableCell>
        {headCells.map(headCell =>
          headCell.flexible ? (
            <FlexTableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </FlexTableCell>
          ) : (
            <StyledTableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          ),
        )}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
