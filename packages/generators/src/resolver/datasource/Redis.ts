import { DataSourceType } from "./../../types";
import { randomUUID } from "crypto";
import defu from "defu";

const SUPPORTED_OPERATORS = ["eq"];

const getWhereKey = (params, meta) => {
  return [meta.tableName]
    .concat(
      Object.keys(params.where).flatMap((fieldName) =>
        Object.entries(params.where[fieldName]).map(([op, value]) => {
          if (!SUPPORTED_OPERATORS.includes(op)) {
            throw new Error(`Operator ${op} is not supported yeat`);
          }
          return value;
        })
      )
    )
    .join(":");
};

export default (
  datasourceName: string,
  client
): { [key: string]: DataSourceType } => {
  return {
    [datasourceName]: {
      association(params, meta) {
        return client.get(getWhereKey(params, meta));
      },
      get(params, meta) {
        return client.get(getWhereKey(params, meta));
      },
      all(params, meta) {
        return client.get(getWhereKey(params, meta));
      },
      count(params, meta) {
        throw new Error(
          "Not supported count operation into Redis datasource, yeat!"
        );
      },
      create(params, meta) {
        const primaryFieldName = Object.keys(meta.model.fields).find(
          (fieldName) => meta.model.fields[fieldName].primary
        );
        if (!primaryFieldName)
          throw new Error("Not found primary field into model ${meta.name}");

        params.input[primaryFieldName] =
          params.input[primaryFieldName] ?? randomUUID();

        const key = getWhereKey(
          {
            where: {
              [primaryFieldName]: { eq: params.input[primaryFieldName] },
            },
          },
          meta
        );
        client.set(key, params.input);

        return params.input;
      },
      update(params, meta) {
        return this.get(params, meta).then((value) =>
          client.set(getWhereKey(params, meta), defu(value, params.input))
        );
      },
      delete: (params, meta) => {
        return client.det(getWhereKey(params, meta));
      },
    },
  };
};
