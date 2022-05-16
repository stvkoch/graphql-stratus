import refreshToken from "./../middlewares/sessions/refresh-token"
import signin from './../middlewares/sessions/signin'
import signout from "./../middlewares/sessions/signout"
import checksSignin from "./../middlewares/sessions/checks-signin"

export default {
  name: 'sessions',
  tableName: 'Sessions',
  fields: {
    Audience: {
      type: 'ID',
      default: '',
      primary: true,
      nullable: true
    },
    Token: {
      type: 'String',
      default: '',
      nullable: true
    },
    Username: {
      type: 'String',
      default: '',
      nullable: true
    },
    Password: {
      type: 'String',
      default: '',
      nullable: true
    },
  },
  associations: {
    customer: { belongsTo: 'customers', field: {fk:'CustomerId', k:'Id'} },
  },
  middlewares: {
    // all: ,
    get: checksSignin,
    update: refreshToken,
    create: signin,
    delete: signout,
    // subscribe: []
  },
  datasource: {
    get: "REDIS",
    count: "REDIS",
    update: "REDIS",
    create: "REDIS",
    delete: "REDIS",
  },
  generate: {
    all: false,
    get: true,
    update: true,
    create: true,
    delete: true,
    subscribe: true,
  }
}