
export default {
  name: 'addresses',
  tableName: 'addresses',
  fields: {
    name: {
      type: 'String',
      default: '',
      nullable: false
    },
    city: {
      type: 'String',
      default: '',
      nullable: true
    },
  },
  associations: {
    customer: { belongsTo: 'customers' },
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
  generate: {
    all: true,
    get: true,
    update: true,
    create: true,
    delete: true,
    subscribe: true,
  }
}