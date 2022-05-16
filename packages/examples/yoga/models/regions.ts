
export default {
  name: 'regions',
  tableName: 'Region',
  fields: {
    Id: {
      type: 'ID',
      default: '',
      nullable: false
    },
    RegionDescription: {
      type: 'String',
      default: '',
      nullable: true
    },
  },
  associations: {
    territories: { hasMany: 'territories', field: {fk:'RegionId', k:'Id'} },
  },
  // middlewares: {
  //   all: [],
  //   get: [],
  //   update: [],
  //   create: [],
  //   delete: [],
  //   subscribe: []
  // },
  generate: {
    all: true,
    get: true,
    update: true,
    create: true,
    delete: true,
    subscribe: true,
  }
}