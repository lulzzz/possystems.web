import englishMessages from 'ra-language-english';

export default {
  ...englishMessages,

  ['Not Found']: 'Not found',
  ['Configuration updated']: 'Configuration updated',
  ['Unauthorized']: 'Unauthorized',
  Products: 'Products',
  Purchases: 'Purchases',
  Users: 'Users',
  Settings: 'Settings',
  Reports: 'Reports',
  pos: {
    search: 'Search',
    configuration: 'Configuration',
    language: 'Language',
    theme: {
      name: 'Theme',
      light: 'Light',
      dark: 'Dark',
    },
    dashboard: {
      monthly_revenue: 'Monthly Revenue',
      new_orders: 'New Orders',
      pending_reviews: 'Pending Reviews',
      reorder_pending: 'Pending Reorders (Top 10)',
      pending_deliveries: 'Pending Deliveries',
      order: {
        items:
          'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
      },
      welcome: {
        title: 'Welcome to admin-on-rest demo',
        subtitle:
          "This is the admin of an imaginary poster shop. Fell free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
        go_to_sales: 'Go to Sales',
        demo_button: 'Source for this demo',
        param_download: 'Download Params',
      },
    },
    action: {
      generate: 'Generate',
    },
    menu: {
      products: 'Products',
      purchases: 'Purchases',
      users: 'Users',
      settings: 'Settings',
      reports: 'Reports',
    },
    productImportWait: 'Importing products. Please wait...',
    productImported: 'Products imported.',
    productImportFailed: 'Error: Product importing failed.',
    session: {
      error: {
        barcode: 'The scanned barcode is unacceptable.',
        status: 'Failed to get the status of last session.',
        user: 'Failed to get the info on logged in user.',
      },
      start: 'Starting new session.',
      end: 'Session ended.',
    },
    forgetpassword: {
      error: 'Password was not able to sent. Please contact administration',
      success: 'Password sent successfully',
    },
  },
  errors: {
    reportGeneration: 'Error: Report generation failed.',
  },
  resources: {
    measurementunits: {
      name: 'Measurement Units',
    },
    suppliers: {
      name: 'Suppliers',
    },
    productcategories: {
      name: 'Product Categories',
    },
    products: {
      name: 'Products',
    },
    purchaseexport: {
      name: 'Purchase Export',
    },
    purchases: {
      name: 'Purchase Orders',
    },
    purchasedetails: {
      name: 'Purchase Details',
    },
    purchasereturns: {
      name: 'Purchase Returns',
    },
    salesmasters: {
      name: 'Sales History',
    },
    salesreturns: {
      name: 'Sales Returns',
    },
    eligibleproducts: {
      name: 'Eligible Products',
    },
    rejectreasons: {
      name: 'Reject Reasons',
    },
    configurations: {
      name: 'Configurations',
    },
    roles: {
      name: 'Roles',
      error: 'Getting roles failed.',
    },
    users: {
      name: 'Users',
      unique: 'Username already exists.',
    },
    userroles: {
      name: 'User Roles',
    },
    roleclaims: {
      name: 'Role Claims',
      error: 'Assigning claims to the role failed.',
      success: 'Assignment finished successfully.',
      unique: 'This role claim already exists.',
    },
    dailysalesreport: {
      name: 'Daily Sales',
    },
    inventoryreport: {
      name: 'Inventory',
    },
    detailedsalesreport: {
      name: 'Detailed Sales',
    },
    detailedsalesreportrx: {
      name: 'Detailed Sales - Rx',
    },
    salesendreport: {
      name: 'End Sales',
    },
    sources: {
      name: 'Sources',
    },
    priceranges: {
      name: 'Price Ranges',
    },
    productpriceranges: {
      name: 'Product Price Ranges',
    },
    posterminals: {
      name: 'POS Terminals',
    },
    customers: {
      name: 'Customers',
    },
    sales: {
      name: 'New Sales',
    },
    manufacturers: {
      name: 'Manufacturers',
    },
    session: {
      name: 'Session',
    },
    timesheet: {
      name: 'Timesheet',
    },
    timesheetreport: {
      name: 'Timesheet',
    },
    company: {
      name: 'Company',
    },
  },
};
