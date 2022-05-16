export default {
  name: "employees",
  tableName: "Employee",
  fields: {
    Id: {
      type: "ID",
      primary: true,
      nullable: false,
    },
    LastName: {
      type: "String",
      default: "",
      nullable: true,
    },
    FirstName: {
      type: "String",
      default: "",
      nullable: true,
    },
    Title: {
      type: "String",
      default: "",
      nullable: true,
    },
    TitleOfCourtesy: {
      type: "String",
      default: "",
      nullable: true,
    },
    BirthDate: {
      type: "String",
      default: "",
      nullable: true,
    },
    HireDate: {
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
    Country: {
      type: "String",
      default: "",
      nullable: true,
    },
    HomePhone: {
      type: "String",
      default: "",
      nullable: true,
    },
    Extension: {
      type: "String",
      default: "",
      nullable: true,
    },
    Photo: {
      type: "String",
      default: "",
      nullable: true,
      transform: (row) => row.Photo,
    },
    Notes: {
      type: "String",
      default: "",
      nullable: true,
    },
    ReportsTo: {
      type: "String",
      default: "",
      nullable: true,
    },
    PhotoPath: {
      type: "String",
      default: "",
      nullable: true,
    },
  },
  associations: {
    orders: { hasMany: "orders", field: { fk: "EmployeeId", k: "Id" } },
    territories: {
      hasManyToMany: "territories",
      through: "EmployeeTerritory",
      parentKey: { fk: "TerritoryId", k: "Id" },
      field: { fk: "EmployeeId", k: "Id" },
    },
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
