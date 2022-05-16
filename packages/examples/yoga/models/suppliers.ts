export default {
  name: "suppliers",
  tableName: "Supplier",
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
    ContactTitle: {
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
    HomePage: {
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
    products: { hasMany: "products", field: {fk:"SupplierId", k:"Id"} },
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
    all: "DB",
    get: "DB",
    update: "DB",
    create: "DB",
    delete: "DB",
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
