/* eslint-disable react/jsx-key */
import React from 'react';
import { Route } from 'react-router';
import DailySalesReport from './components/Reports/DailySalesReport';
import InventoryReport from './components/Reports/InventoryReport';
import SalesEndReport from './components/Reports/SalesEndReport';
import DetailedSalesReport from './components/Reports/DetailedSalesReport';
import DetailedSalesReportRx from './components/Reports/DetailedSalesReportRx';
import TimesheetReport from './components/Reports/TimesheetReport';
import Configuration from './components/Configuration';
import Sales from './components/Sales';
import Session from './components/Session';
import Company from './components/Company';
import ForgotPassword from './ForgotPassword';

export default [
  <Route exact path="/sales" component={Sales} noLayout />,
  <Route exact path="/session" component={Session} />,
  <Route exact path="/configurations" component={Configuration} />,
  <Route exact path="/company" component={Company} />,
  <Route exact path="/dailysalesreport" component={DailySalesReport} />,
  <Route exact path="/inventoryreport" component={InventoryReport} />,
  <Route exact path="/salesendreport" component={SalesEndReport} />,
  <Route exact path="/detailedsalesreport" component={DetailedSalesReport} />,
  <Route
    exact
    path="/detailedsalesreportrx"
    component={DetailedSalesReportRx}
  />,
  <Route exact path="/timesheetreport" component={TimesheetReport} />,
  <Route exact path="/forgotpassword" component={ForgotPassword} noLayout />,
];
