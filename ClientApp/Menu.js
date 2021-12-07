import React, { useState } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import SubMenu from './SubMenu';

import { withRouter } from 'react-router-dom';
import {
  translate,
  DashboardMenuItem,
  MenuItemLink,
  usePermissions,
} from 'react-admin';

import LabelIcon from '@material-ui/icons/LibraryBooks';
import { MeasurementUnitIcon } from './components/MeasurementUnit';
import { ManufacturerIcon } from './components/Manufacturer';
import { ProductCategoryIcon } from './components/ProductCategory';
import { SupplierIcon } from './components/Supplier';
import { ProductIcon } from './components/Product';
import { EligibleProductIcon } from './components/EligibleProduct';
import { PurchaseMasterIcon } from './components/PurchaseMaster';
import { PurchaseDetailIcon } from './components/PurchaseDetail';
import { SalesHistoryIcon } from './components/SalesHistory';
import { ConfigurationIcon } from './components/Configuration';
import { RoleIcon } from './components/Role';
import { UserIcon } from './components/User';
import { RoleClaimIcon } from './components/RoleClaim';
import { UserRoleIcon } from './components/UserRole';
import { SourceIcon } from './components/Source';
import { PriceRangeIcon } from './components/PriceRange';
import { ProductPriceRangeIcon } from './components/ProductPriceRange';
import { PosTerminalIcon } from './components/PosTerminal';
import { CustomerIcon } from './components/Customer';
import { ReportIcon } from './components/Reports/DailySalesReport';
import { SessionIcon } from './components/Session';
import { TimesheetIcon } from './components/Timesheet';
import { CompanyIcon } from './components/Company';

import ListItemIcon from '@material-ui/core/ListItemIcon';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: green[900],
    minWidth: 40,
  },
};

export const GreenListItemIcon = withStyles(styles)(({ classes, ...props }) => (
  <ListItemIcon className={classes.icon} {...props} />
));

const Menu = ({ onMenuClick, logout, open, translate }) => {
  const [menuCatalog, setMenuCatalog] = useState(false);
  const [menuPurchases, setMenuPurchases] = useState(false);
  const [menuUsers, setMenuUsers] = useState(false);
  const [menuSettings, setMenuSettings] = useState(false);
  const [menuReports, setMenuReports] = useState(false);

  const { permissions } = usePermissions();

  return (
    <div>
      {' '}
      {permissions?.includes('sale') && (
        <MenuItemLink
          to={'/sales'}
          primaryText={translate('resources.sales.name', {
            smart_count: 2,
          })}
          leftIcon={
            <GreenListItemIcon>
              <AddShoppingCartIcon />
            </GreenListItemIcon>
          }
          onClick={onMenuClick}
        />
      )}
      {permissions?.includes('company') && (
        <MenuItemLink
          to={'/company'}
          primaryText={translate('resources.company.name', {
            smart_count: 2,
          })}
          leftIcon={<CompanyIcon />}
          onClick={onMenuClick}
        />
      )}
      <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
      {permissions?.includes('session') && (
        <MenuItemLink
          to={'/session'}
          primaryText={translate('resources.session.name', {
            smart_count: 2,
          })}
          leftIcon={<SessionIcon />}
          onClick={onMenuClick}
        />
      )}
      {permissions?.includes('timesheet') && (
        <MenuItemLink
          to={'/sessions'}
          primaryText={translate('resources.timesheet.name', {
            smart_count: 2,
          })}
          leftIcon={<TimesheetIcon />}
          onClick={onMenuClick}
        />
      )}
      {permissions?.includes('product') && (
        <MenuItemLink
          to={'/measurementunits'}
          primaryText={translate('resources.measurementunits.name', {
            smart_count: 2,
          })}
          leftIcon={<MeasurementUnitIcon />}
          onClick={onMenuClick}
        />
      )}
      {permissions?.includes('product') && (
        <MenuItemLink
          to={'/suppliers'}
          primaryText={translate('resources.suppliers.name', {
            smart_count: 2,
          })}
          leftIcon={<SupplierIcon />}
          onClick={onMenuClick}
        />
      )}
      {permissions?.includes('product') && (
        <SubMenu
          handleToggle={() => setMenuCatalog(!menuCatalog)}
          isOpen={menuCatalog}
          sidebarIsOpen={open}
          name={translate('pos.menu.products', {
            smart_count: 2,
          })}
          icon={<LabelIcon />}
        >
          <MenuItemLink
            to={'/productcategories'}
            primaryText={translate('resources.productcategories.name', {
              smart_count: 2,
            })}
            leftIcon={<ProductCategoryIcon />}
            onClick={onMenuClick}
          />
          <MenuItemLink
            to={'/manufacturers'}
            primaryText={translate('resources.manufacturers.name', {
              smart_count: 2,
            })}
            leftIcon={<ManufacturerIcon />}
            onClick={onMenuClick}
          />
          <MenuItemLink
            to={'/products'}
            primaryText={translate('resources.products.name', {
              smart_count: 2,
            })}
            leftIcon={<ProductIcon />}
            onClick={onMenuClick}
          />
          <MenuItemLink
            to={'/productpriceranges'}
            primaryText={translate('resources.productpriceranges.name', {
              smart_count: 2,
            })}
            leftIcon={<ProductPriceRangeIcon />}
            onClick={onMenuClick}
          />
          <MenuItemLink
            to={'/eligibleproducts'}
            primaryText={translate('resources.eligibleproducts.name', {
              smart_count: 2,
            })}
            leftIcon={<EligibleProductIcon />}
            onClick={onMenuClick}
          />
        </SubMenu>
      )}
      {permissions?.includes('purchase') && (
        <SubMenu
          handleToggle={() => setMenuPurchases(!menuPurchases)}
          isOpen={menuPurchases}
          sidebarIsOpen={open}
          name={translate('pos.menu.purchases', {
            smart_count: 2,
          })}
          icon={<LabelIcon />}
        >
          <MenuItemLink
            to={'/purchases'}
            primaryText={translate('resources.purchases.name', {
              smart_count: 2,
            })}
            leftIcon={<PurchaseMasterIcon />}
            onClick={onMenuClick}
          />
          <MenuItemLink
            to={'/purchasedetails'}
            primaryText={translate('resources.purchasedetails.name', {
              smart_count: 2,
            })}
            leftIcon={<PurchaseDetailIcon />}
            onClick={onMenuClick}
          />
        </SubMenu>
      )}
      {permissions?.includes('saleshistory') && (
        <MenuItemLink
          to={'/salesmasters'}
          primaryText={translate('resources.salesmasters.name', {
            smart_count: 2,
          })}
          leftIcon={<SalesHistoryIcon />}
          onClick={onMenuClick}
        />
      )}
      {permissions?.includes('customer') && (
        <MenuItemLink
          to={'/customers'}
          primaryText={translate('resources.customers.name', {
            smart_count: 2,
          })}
          leftIcon={<CustomerIcon />}
          onClick={onMenuClick}
        />
      )}
      {permissions?.includes('user') && (
        <SubMenu
          handleToggle={() => setMenuUsers(!menuUsers)}
          isOpen={menuUsers}
          sidebarIsOpen={open}
          name={translate('pos.menu.users', {
            smart_count: 2,
          })}
          icon={<LabelIcon />}
        >
          <MenuItemLink
            to={'/users'}
            primaryText={translate('resources.users.name', {
              smart_count: 2,
            })}
            leftIcon={<UserIcon />}
            onClick={onMenuClick}
          />
          <MenuItemLink
            to={'/roles'}
            primaryText={translate('resources.roles.name', {
              smart_count: 2,
            })}
            leftIcon={<RoleIcon />}
            onClick={onMenuClick}
          />
          <MenuItemLink
            to={'/userroles'}
            primaryText={translate('resources.userroles.name', {
              smart_count: 2,
            })}
            leftIcon={<UserRoleIcon />}
            onClick={onMenuClick}
          />
          <MenuItemLink
            to={'/roleclaims'}
            primaryText={translate('resources.roleclaims.name', {
              smart_count: 2,
            })}
            leftIcon={<RoleClaimIcon />}
            onClick={onMenuClick}
          />
        </SubMenu>
      )}
      {permissions?.includes('config') && (
        <SubMenu
          handleToggle={() => setMenuSettings(!menuSettings)}
          isOpen={menuSettings}
          sidebarIsOpen={open}
          name={translate('pos.menu.settings', {
            smart_count: 2,
          })}
          icon={<LabelIcon />}
        >
          <MenuItemLink
            to={'/posterminals'}
            primaryText={translate('resources.posterminals.name', {
              smart_count: 2,
            })}
            leftIcon={<PosTerminalIcon />}
            onClick={onMenuClick}
          />
          <MenuItemLink
            to={'/priceranges'}
            primaryText={translate('resources.priceranges.name', {
              smart_count: 2,
            })}
            leftIcon={<PriceRangeIcon />}
            onClick={onMenuClick}
          />
          <MenuItemLink
            to={'/configurations'}
            primaryText={translate('resources.configurations.name', {
              smart_count: 2,
            })}
            leftIcon={<ConfigurationIcon />}
            onClick={onMenuClick}
          />
          <MenuItemLink
            to={'/sources'}
            primaryText={translate('resources.sources.name', {
              smart_count: 2,
            })}
            leftIcon={<SourceIcon />}
            onClick={onMenuClick}
          />
        </SubMenu>
      )}
      {permissions?.includes('report') && (
        <SubMenu
          handleToggle={() => setMenuReports(!menuReports)}
          isOpen={menuReports}
          sidebarIsOpen={open}
          name={translate('pos.menu.reports', {
            smart_count: 2,
          })}
          icon={<LabelIcon />}
        >
          <MenuItemLink
            to={'/dailysalesreport'}
            primaryText={translate('resources.dailysalesreport.name', {
              smart_count: 2,
            })}
            leftIcon={<ReportIcon />}
            onClick={onMenuClick}
          />
          <MenuItemLink
            to={'/detailedsalesreport'}
            primaryText={translate('resources.detailedsalesreport.name', {
              smart_count: 2,
            })}
            leftIcon={<ReportIcon />}
            onClick={onMenuClick}
          />
          <MenuItemLink
            to={'/detailedsalesreportrx'}
            primaryText={translate('resources.detailedsalesreportrx.name', {
              smart_count: 2,
            })}
            leftIcon={<ReportIcon />}
            onClick={onMenuClick}
          />
          <MenuItemLink
            to={'/inventoryreport'}
            primaryText={translate('resources.inventoryreport.name', {
              smart_count: 2,
            })}
            leftIcon={<ReportIcon />}
            onClick={onMenuClick}
          />
          <MenuItemLink
            to={'/salesendreport'}
            primaryText={translate('resources.salesendreport.name', {
              smart_count: 2,
            })}
            leftIcon={<ReportIcon />}
            onClick={onMenuClick}
          />
          <MenuItemLink
            to={'/timesheetreport'}
            primaryText={translate('resources.timesheetreport.name', {
              smart_count: 2,
            })}
            leftIcon={<ReportIcon />}
            onClick={onMenuClick}
          />
        </SubMenu>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  open: state.admin.ui.sidebarOpen,
  theme: state.theme,
});

const enhance = compose(withRouter, connect(mapStateToProps, {}), translate);

export default enhance(Menu);
