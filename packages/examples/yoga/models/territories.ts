export default {
  name: "territories",
  tableName: "Territory",
  fields: {
    Id: {
      type: "ID",
      primary: true,
      nullable: false,
    },
    TerritoryDescription: {
      type: "String",
      default: "",
      nullable: true,
    },
  },
  associations: {
    region: { belongsTo: "regions", field: { k: "Id", fk: "RegionId" } },
    employees: {
      hasManyToMany: "employees",
      through: "EmployeeTerritory",
      parentKey: { fk: "EmployeeId", k: "Id" },
      field: { fk: "TerritoryId", k: "Id" },
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
