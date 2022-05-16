export default {
  name: "ordersdetails",
  tableName: "OrderDetail",
  fields: {
    Id: {
      type: "ID",
      primary: true,
      nullable: false,
    },
    UnitPrice: {
      type: "Float",
      default: "",
      nullable: false,
    },
    Quantity: {
      type: "Int",
      default: "",
      nullable: false,
    },
    Discount: {
      type: "Float",
      default: "",
      nullable: false,
    }
  },
  associations: {
    order: { belongsTo: "orders", field: {k:"Id", fk: "OrderId"} },
    product: { belongsTo: "products", field: {k:"Id", fk:"ProductId"} },
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
