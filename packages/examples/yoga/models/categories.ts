import { compose } from "lodash/fp";

import authentication from "./../middlewares/authentication";
import authorization from "./../middlewares/authorization";
import onlyOwnData from './../middlewares/only-own-data'

const log1 = (op) =>
  function (next) {
    return (source, params, context) => {
      this.datasource.log(op, "MIDDLEWARE --- 1");
      return next(source, params, context);
    };
  };
const log2 = (op) =>
  function (next) {
    return (source, params, context) => {
      this.datasource.log(op, "MIDDLEWARE --- 2");
      return next(source, params, context);
    };
  };
const log3 = (op) =>
  function (next) {
    return (source, params, context) => {
      this.datasource.log(op, "MIDDLEWARE 3 include DB datasource: " + ('DB' in this.datasource));

      return next(source, params, context);
    };
  };

const modelMiddleware = (op, ...additionalMiddlewares) => compose(
      authentication,
      authorization('categories', op),
      onlyOwnData,
      ...additionalMiddlewares
    )

export default {
  name: "categories",
  tableName: "Category",
  fields: {
    Id: {
      type: "ID",
      primary: true,
      nullable: false,
    },
    CategoryName: {
      type: "String",
      default: "",
      nullable: false,
    },
    Description: {
      type: "String",
      default: "",
      nullable: true,
      generate: false
    },
  },
  associations: {},
  middlewares: {
    count: modelMiddleware('count', log3('count')),
    get: modelMiddleware(log1("get"), log2("get"), log3("get")),
    all: compose(log1("all"), log2("all"), log3("all")),
    create: compose(log1("create"), log2("create"), log3("create")),
    update: compose(log1("update"), log2("update"), log3("update")),
    delete: compose(log1("delete"), log2("delete"), log3("delete")),
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
