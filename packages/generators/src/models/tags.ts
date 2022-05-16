
export default {
  name: 'tags',
  tableName: 'tags',
  fields: {
    name: {
      type: 'String',
      default: '',
      nullable: false
    }
  },
  associations: {
    customers: { hasManyToMany: 'customers' },
    addresses: { hasManyToMany: 'addresses' }
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