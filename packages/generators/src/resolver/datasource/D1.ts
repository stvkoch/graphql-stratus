const sql = require("sql-query");
import { DataSourceType } from "./../../types";

const makeWhere = (where = {}) =>
  Object.keys(where).reduce(
    (s, field) =>
      Object.keys(where[field]).reduce(
        (ss, op) => ({ ...ss, [field]: sql[op](where[field][op]) }),
        s
      ),
    {}
  );

export default (DB): DataSourceType => ({
  association: (params, meta) => {},
  get: (params = { where: {} }, meta) => {
    const { where } = params;
    const sqlQuery = sql
      .Query()
      .select()
      .from(meta.tableName)
      .where(makeWhere(where));

    return DB.get(sqlQuery.build());
  },

  all: (params, meta) => DB.get(meta.name),
  count: (params, meta) => DB.get(meta.name),
  create: (params, meta) => DB.exec(meta.name),
  update: (params, meta) => DB.exec(meta.name),
  delete: (params, meta) => DB.exec(meta.name),
});
