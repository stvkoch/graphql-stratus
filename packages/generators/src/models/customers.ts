
export default {
  name: 'customers',
  tableName: 'customers',
  fields: {
    id: {
      type: 'ID',
      primary: true,
      nullable: false
    },
    name: {
      type: 'String',
      default: '',
      nullable: false
    },
    email: {
      type: 'String',
      default: '',
      nullable: true
    },
  },
  associations: {
    addresses: { hasMany: 'addresses' },
    // tags: { hasManyToMany: 'tags', through: 'products_tags' }
  },
  // middlewares: {
  //   all: [],
  //   get: [],
  //   update: [],
  //   create: [],
  //   delete: [],
  //   subscribe: []
  // },
  datasource: {
    all: 'DB',
    get: 'DB',
    update: 'DB',
    create: 'DB',
    delete: 'DB',
  },
  generate: {
    all: true,
    get: true,
    update: true,
    create: true,
    delete: true,
    subscribe: true,
  }
}