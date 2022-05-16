export default {
  name: "orders",
  tableName: "Order",
  fields: {
    Id: {
      type: "ID",
      primary: true,
      nullable: false,
    },
    OrderDate: {
      type: "String",
      default: "",
      nullable: false,
    },
    RequiredDate: {
      type: "String",
      default: "",
      nullable: false,
    },
    ShippedDate: {
      type: "String",
      default: "",
      nullable: false,
    },
    ShipVia: {
      type: "String",
      default: "",
      nullable: false,
    },
    Freight: {
      type: "Float",
      default: "",
      nullable: false,
    },
    ShipName: {
      type: "String",
      default: "",
      nullable: false,
    },
    ShipAddress: {
      type: "String",
      default: "",
      nullable: false,
    },
    ShipCity: {
      type: "String",
      default: "",
      nullable: true,
    },
    ShipRegion: {
      type: "String",
      default: "",
      nullable: true,
    },
    ShipPostalCode: {
      type: "String",
      default: "",
      nullable: true,
    },
    ShipCountry: {
      type: "String",
      default: "",
      nullable: true,
    },
  },
  associations: {
    customer: { belongsTo: "customers", field: {k: "Id", fk:"CustomerId"} },
    employee: { belongsTo: "employees", field: {k:"Id", fk: "EmployeeId"} },
    details: { hasMany: "ordersdetails", field: {fk:"OrderId", k:"Id"} },
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
    count: "DB",
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
