const sql = require("sql-query");
import { DataSourceType } from "./../../types";
import { RESULT_OPERATORS } from "../../schema/generator/inputs";

const makeWhere = (where = {}) =>
  Object.keys(where).reduce(
    (s, field) =>
      Object.keys(where[field]).reduce((ss, op) => {
        if (!sql[op]) return ss;

        return { ...ss, [field]: sql[op](where[field][op]) };
      }, s),
    {}
  );

const mapDirection = {
  ASC: "A",
  DESC: "Z",
};

const makeResultOperators = (select, where) => {
  if (!where) return select;

  const ops = Object.keys(RESULT_OPERATORS);
  return ops.reduce((s, op) => {
    if ("_orderBy" in where && Array.isArray(where._orderBy)) {
      return where._orderBy.reduce(
        (ac, [order, direction = "A"]) =>
          ac.order.apply(ac, [order, mapDirection[direction] || direction]),
        select
      );
    }
    if ("_groupBy" in where) return select.groupBy(where._groupBy);
    if ("_limit" in where) {
      return select.limit(where._limit);
    }
    if ("_offset" in where) return select.offset(where._offset);

    return select;
  }, select);
};

const result = {
  hasOne: ([r]) => r,
  belongsTo: ([r]) => r,
  hasManyToMany: (r) => r,
  hasMany: (r) => r,
};

const makeAssociationSql = {
  belongsTo(params, meta, source) {
    const select = sql
      .Query({})
      .select()
      .from(params.associationMetaModel.tableName)
      .where({
        [params.association.field.k]: source[params.association.field.fk],
      });

    if (params.count) return select.count(null, "c");

    return select;
  },
  hasOne(params, meta, source) {
    const select = sql
      .Query({})
      .select()
      .from(params.associationMetaModel.tableName)
      .where({
        [params.association.field.fk]: source[params.association.field.k],
      })
      .where(makeWhere(params.where));

    return select;
  },
  hasMany(params, meta, source) {
    const select = sql
      .Query({})
      .select()
      .from(params.associationMetaModel.tableName)
      .where({
        [params.association.field.fk]: source[params.association.field.k],
      })
      .where(makeWhere(params.where));
    if (params.count) return select.count(null, "c");

    return select;
  },
  hasManyToMany(params, meta, source) {
    let select = sql
      .Query({})
      .select()
      .from(params.associationMetaModel.tableName);
    if (params.count) select = select.count(null, "c");
    else
      select = select.select(
        Object.keys(params.associationMetaModel.model.fields)
      );

    return (
      select
        .where(params.associationMetaModel.tableName, makeWhere(params.where))
        .from(
          params.through,
          params.association.parentKey.fk,
          params.association.parentKey.k
        )
        .where(params.through, {
          [params.association.field.fk]: source[params.association.field.k],
        }),
      params.where
    );
  },
};

export default (
  datasourceName: string,
  client
): { [key: string]: DataSourceType } => ({
  [datasourceName]: {
    association(params = { where: {} }, meta, source) {
      const sqlQuery = makeAssociationSql[params.associationType](
        params,
        meta,
        source
      );

      return makeResultOperators(
        client.get(sqlQuery.build()).then((r) => {
          if (params.count) return result.hasOne(r).c;
          return result[params.associationType](r);
        }),
        params.where
      );
    },
    get(params = { where: {} }, meta) {
      return this.all(params, meta).then(result.hasOne);
    },
    all(params = { where: {} }, meta) {
      const { where } = params;
      const sqlQuery = makeResultOperators(
        sql.Query({}).select().from(meta.tableName).where(makeWhere(where)),
        params.where
      );
      return client.get(sqlQuery.build());
    },

    count(params, meta) {
      const { where } = params;
      const sqlQuery = sql
        .Query({})
        .select()
        .from(meta.tableName)
        .count(null, "c")
        .where(makeWhere(where));

      return client
        .get(sqlQuery.build())
        .then(result.hasOne)
        .then((row) => {
          return parseInt(row?.c);
        });
    },
    create(params, meta) {
      const { input } = params;
      const sqlQuery = sql.Query({}).insert().into(meta.tableName).set(input);
      return client.get(sqlQuery.build() + " RETURNING *").then(result.hasOne);
    },
    update(params, meta) {
      const { where, input } = params;
      const sqlQuery = sql
        .Query({})
        .update()
        .into(meta.tableName)
        .set(input)
        .where(makeWhere(where));

      return client.get(sqlQuery.build()).then(() => this.count(params, meta));
    },
    delete(params, meta) {
      const { where } = params;
      const sqlQuery = sql
        .Query({})
        .remove()
        .from(meta.tableName)
        .where(makeWhere(where));
      return this.count(params, meta).then((c) =>
        client.get(sqlQuery.build()).then((_) => c)
      );
    },
  },
});
