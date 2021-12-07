import React from 'react';
import colors from './colors';

import { useSelector } from 'react-redux';
import _ from 'lodash';

const CalculationBar = props => {
  const cart = useSelector(state => state.cart);

  return (
    <div {...props}>
      <div style={styles.panelHeading}>Calculation</div>
      <div style={styles.panelBody}>
        <div style={{ padding: 0, margin: 0 }}>
          <table style={styles.table}>
            <tbody style={{ fontSize: '1.2rem' }}>
              <tr>
                <td>Subtotal</td>
                <td style={styles.numericTh}>
                  {_.padStart(cart.subTotal, 2, '0')}
                </td>
              </tr>
              <tr />
              <tr style={{ color: colors.discount }}>
                <td>Discount</td>
                <td style={styles.numericTh}>00.00</td>
              </tr>
              <tr />
              <tr>
                <td>Loyalty(R)</td>
                <td style={styles.numericTh}>00.00</td>
              </tr>
              <tr />
              <tr>
                <td>Tax (10%)</td>
                <td style={styles.numericTh}>
                  {_.padStart(cart.totalTax, 2, '0')}
                </td>
              </tr>
              <tr />
              <tr style={{ color: colors.total }}>
                <td>Total</td>
                <td style={styles.numericTh}>
                  {_.padStart(cart.total, 2, '0')}
                </td>
              </tr>
              <tr />
              <tr>
                <td>Tendered</td>
                <td style={styles.numericTh}>00.00</td>
              </tr>
              <tr />
              <tr style={{ color: colors.balance }}>
                <td>Balance</td>
                <td style={styles.numericTh}>00.00</td>
              </tr>
              <tr />
              <tr>
                <td>FSA</td>
                <td style={styles.numericTh}>00.00</td>
              </tr>
              <tr />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  numericTh: {
    textAlign: 'right',
  },
  panelBody: {
    padding: 5,
  },
  panelHeading: {
    backgroundColor: '#673AB7',
    borderColor: '#337ab7',
    color: '#fff',
    borderRadius: 3,
    padding: 10,
  },
  table: {
    width: '100%',
    fontWeight: 'bold',
    padding: 5,
  },
};

export default CalculationBar;
