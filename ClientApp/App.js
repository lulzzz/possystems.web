/* eslint-disable react/jsx-key */
// in src/App.js

import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';

import createAdminStore from './createAdminStore';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import Menu from './Menu';
import authProvider, { httpClient } from './custom/authProvider';

import {
  MeasurementUnitList,
  MeasurementUnitEdit,
  MeasurementUnitCreate,
} from './components/MeasurementUnit';
import {
  ProductCategoryList,
  ProductCategoryEdit,
  ProductCategoryCreate,
} from './components/ProductCategory';
import { ProductList, ProductEdit, ProductCreate } from './components/Product';
import {
  PurchaseMasterList,
  PurchaseMasterEdit,
  PurchaseMasterCreate,
} from './components/PurchaseMaster';
import {
  PurchaseDetailList,
  PurchaseDetailEdit,
  PurchaseDetailCreate,
} from './components/PurchaseDetail';
import { SalesHistoryList, SalesHistoryShow } from './components/SalesHistory';
import {
  SupplierList,
  SupplierEdit,
  SupplierCreate,
} from './components/Supplier';
import {
  EligibleProductList,
  EligibleProductShow,
} from './components/EligibleProduct';
import { RoleList, RoleEdit, RoleCreate } from './components/Role';
import { UserList, UserEdit, UserCreate } from './components/User';
import {
  UserRoleList,
  UserRoleEdit,
  UserRoleCreate,
} from './components/UserRole';
import {
  RoleClaimList,
  RoleClaimEdit,
  RoleClaimCreate,
} from './components/RoleClaim';
import { SourceList, SourceEdit, SourceCreate } from './components/Source';
import {
  PriceRangeList,
  PriceRangeEdit,
  PriceRangeCreate,
} from './components/PriceRange';
import {
  ProductPriceRangeList,
  ProductPriceRangeEdit,
  ProductPriceRangeCreate,
} from './components/ProductPriceRange';
import {
  CustomerList,
  CustomerEdit,
  CustomerCreate,
} from './components/Customer';
import {
  PosTerminalList,
  PosTerminalEdit,
  PosTerminalCreate,
} from './components/PosTerminal';
import {
  ManufacturerList,
  ManufacturerEdit,
  ManufacturerCreate,
} from './components/Manufacturer';
import {
  TimesheetList,
  TimesheetEdit,
  TimesheetCreate,
} from './components/Timesheet';

import { Dashboard } from './components/Dashboard/';

import polyglotI18nProvider from 'ra-i18n-polyglot';

import englishMessages from './i18n/en';
import customRoutes from './routes';
import Login from './Login';

import axios from 'axios';

const messages = {
  fr: () => import('./i18n/fr.js').then(messages => messages.default),
};

const i18nProvider = polyglotI18nProvider(locale => {
  if (locale === 'fr') {
    return messages[locale]();
  }

  // Always fallback on english
  return englishMessages;
}, 'en');

axios.interceptors.request.use(function(config) {
  const token = sessionStorage.getItem('token');
  config.headers.authorization = `Bearer ${token}`;

  return config;
});

const dataProvider = simpleRestProvider(apiUrl + '/api', httpClient);
const history = createHashHistory();

const App = () => (
  <Provider
    store={createAdminStore({
      authProvider,
      dataProvider,
      history,
    })}
  >
    <Admin
      title="POSSystems 3.0.0"
      loginPage={Login}
      dataProvider={dataProvider}
      menu={Menu}
      customRoutes={customRoutes}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      history={history}
      dashboard={Dashboard}
    >
      {permissions => [
        permissions?.includes('product')
          ? [
              <Resource
                name="measurementunits"
                list={MeasurementUnitList}
                edit={MeasurementUnitEdit}
                create={MeasurementUnitCreate}
                options={{ label: 'Measurement Unit' }}
              />,
              <Resource
                name="suppliers"
                list={SupplierList}
                edit={SupplierEdit}
                create={SupplierCreate}
                options={{ label: 'Suppliers' }}
              />,
              <Resource
                name="productcategories"
                list={ProductCategoryList}
                edit={ProductCategoryEdit}
                create={ProductCategoryCreate}
                options={{ label: 'Product Category' }}
              />,
              <Resource
                name="products"
                list={ProductList}
                edit={ProductEdit}
                create={ProductCreate}
                options={{ label: 'Product' }}
              />,
              <Resource
                name="eligibleproducts"
                list={EligibleProductList}
                show={EligibleProductShow}
                options={{ label: 'Eligible Product' }}
              />,
              <Resource
                name="productpriceranges"
                list={ProductPriceRangeList}
                edit={ProductPriceRangeEdit}
                create={ProductPriceRangeCreate}
                options={{ label: 'Product Price Range' }}
              />,
              <Resource
                name="manufacturers"
                list={ManufacturerList}
                edit={ManufacturerEdit}
                create={ManufacturerCreate}
                options={{ label: 'Manufacturer' }}
              />,
            ]
          : null,
        permissions?.includes('purchase')
          ? [
              <Resource
                name="purchases"
                list={PurchaseMasterList}
                edit={PurchaseMasterEdit}
                create={PurchaseMasterCreate}
                options={{ label: 'Purchase Master' }}
              />,
              <Resource
                name="purchasedetails"
                list={PurchaseDetailList}
                edit={PurchaseDetailEdit}
                create={PurchaseDetailCreate}
                options={{ label: 'Purchase Detail' }}
              />,
            ]
          : null,
        permissions?.includes('saleshistory')
          ? [
              <Resource
                name="salesmasters"
                list={SalesHistoryList}
                show={SalesHistoryShow}
                options={{ label: 'Sales History' }}
              />,
              <Resource name="salesdetails" />,
              <Resource name="transactions" />,
            ]
          : null,
        permissions?.includes('user')
          ? [
              <Resource
                name="roles"
                list={RoleList}
                edit={RoleEdit}
                create={RoleCreate}
                options={{ label: 'Role' }}
              />,
              <Resource
                name="users"
                list={UserList}
                edit={UserEdit}
                create={UserCreate}
                options={{ label: 'User' }}
              />,
              <Resource
                name="userroles"
                list={UserRoleList}
                edit={UserRoleEdit}
                create={UserRoleCreate}
                options={{ label: 'User Role' }}
              />,
              <Resource
                name="roleclaims"
                list={RoleClaimList}
                edit={RoleClaimEdit}
                create={RoleClaimCreate}
                options={{ label: 'Role Claim' }}
              />,
            ]
          : null,
        permissions?.includes('config')
          ? [
              <Resource
                name="sources"
                list={SourceList}
                edit={SourceEdit}
                create={SourceCreate}
                options={{ label: 'Source' }}
              />,
              <Resource
                name="posterminals"
                list={PosTerminalList}
                edit={PosTerminalEdit}
                create={PosTerminalCreate}
                options={{ label: 'POS Terminal' }}
              />,
              <Resource
                name="priceranges"
                list={PriceRangeList}
                edit={PriceRangeEdit}
                create={PriceRangeCreate}
                options={{ label: 'Price Range' }}
              />,
            ]
          : null,
        permissions?.includes('customer')
          ? [
              <Resource
                name="customers"
                list={CustomerList}
                edit={CustomerEdit}
                create={CustomerCreate}
                options={{ label: 'Customer' }}
              />,
            ]
          : null,
        permissions?.includes('timesheet')
          ? [
              <Resource
                name="sessions"
                list={TimesheetList}
                edit={TimesheetEdit}
                create={TimesheetCreate}
                options={{ label: 'Timesheet' }}
              />,
            ]
          : null,
        <Resource name="claims" />,
      ]}
    </Admin>
  </Provider>
);

export default hot(App);
