const log = function (next) {
  return (source, params, context) => {
    console.log("MIDDLEWARE:", params, this);
    return next(source, params, context);
  };
};

export default {
  name: "products",
  tableName: "Product",
  fields: {
    Id: {
      type: "ID",
      primary: true,
      nullable: false,
    },
    ProductName: {
      type: "String",
      default: "",
      nullable: true,
    },
    QuantityPerUnit: {
      type: "String",
      default: "",
      nullable: true,
    },
    UnitPrice: {
      type: "Float",
      default: "",
      nullable: true,
    },
    UnitsOnOrder: {
      type: "Int",
      default: "",
      nullable: true,
    },
    UnitOnOrder: {
      type: "Int",
      default: "",
      nullable: true,
    },
    ReorderLevel: {
      type: "Int",
      default: "",
      nullable: true,
    },
    Discontinued: {
      type: "Int",
      default: "",
      nullable: true,
    },
  },
  associations: {
    orders: {
      hasManyToMany: "orders",
      through: "OrderDetail",
      parentKey: {fk:"OrderId", k:"Id"},
      field: {fk:"ProductId", k:"Id"},
    },
    category: { belongsTo: "categories", field: {k:"Id", fk:"CategoryId"} },
    supplier: { belongsTo: "suppliers", field: {k:"Id", fk:"SupplierId"} },
  },
  middlewares: {
    all: log,
    // get: [],
    // update: [],
    // create: [],
    // delete: [],
    // subscribe: [],
  },
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
