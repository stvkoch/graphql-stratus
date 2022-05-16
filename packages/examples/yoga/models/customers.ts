export default {
  name: "customers",
  tableName: "Customer",
  fields: {
    Id: {
      type: "ID",
      primary: true,
      nullable: false,
    },
    CompanyName: {
      type: "String",
      default: "",
      nullable: true,
    },
    ContactName: {
      type: "String",
      default: "",
      nullable: true,
    },
    CompanyTitle: {
      type: "String",
      default: "",
      nullable: true,
    },
    Address: {
      type: "String",
      default: "",
      nullable: true,
    },
    City: {
      type: "String",
      default: "",
      nullable: true,
    },
    Region: {
      type: "String",
      default: "",
      nullable: true,
    },
    PostalCode: {
      type: "String",
      default: "",
      nullable: true,
    },
    Phone: {
      type: "String",
      default: "",
      nullable: true,
    },
    Fax: {
      type: "String",
      default: "",
      nullable: true,
    },
    Country: {
      type: "String",
      default: "",
      nullable: true,
    },
  },
  associations: {
    orders: { hasMany: "orders", field: {fk:"CustomerId", k:"Id"} },
  },
  // middlewares: {
  //   all: [],
  //   get: [],
  //   update: [],
  //   create: [],
  //   delete: [],
  //   subscribe: [],
  // },
  datasource: {
    all: "MARKETDB",
    get: "MARKETDB",
    count: "MARKETDB",
    update: "MARKETDB",
    create: "MARKETDB",
    delete: "MARKETDB",
  },
  generate: {
    all: true,
    get: true,
    update: true,
    create: true,
    delete: true,
    subscribe: true,
  },
};
