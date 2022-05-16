export default {
  name: "employeesterritories",
  tableName: "EmployeeTerritory",
  fields: {
    Id: {
      type: "ID",
      primary: true,
      nullable: false,
    },
    TerritoryId: {
      type: "ID",
      default: "",
      nullable: false,
    },
    EmployeeId: {
      type: "ID",
      default: "",
      nullable: false,
    },
  },
  associations: {
    // territories: {
    //   hasMany: "territories",
    //   through: "EmployeeTerritory",
    //   childKey: "TerritoryId",
    //   parentKey: {fk:"Id"},
    // },
    // employees: {
    //   hasMany: "employees",
    //   through: "EmployeeTerritory",
    //   childKey: "EmployeeId",
    //   parentKey: {k: "Id"},
    // },
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
