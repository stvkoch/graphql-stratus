import { ModelConfigAssociationType, SchemaMetaModelType } from "../../types";

export const SUPPORTED_TYPES = {
  ID: "ID",
  String: "String",
  Int: "Int",
  Float: "Float",
  Boolean: "Boolean",
  Time: "Time",
  DateTime: "DateTime",
  Date: "Date",
  JSON: "JSON",
  JSONB: "JSON",
};

export const SUPPORTED_OPERATORS_SCALAR = {
  like: "like",
  not_like: "not_like",
  eq: "eq",
  ne: "ne",
  gt: "gt",
  gte: "gte",
  lt: "lt",
  lte: "lte",

  //   or: 'or',
  //   unique: 'unique'
};

export const SUPPORTED_OPERATORS_COLLECTION = {
  between: "between",
  not_between: "not_between",
  in: "eq",
  not_in: "not_in",
  not: "ne",
  //   or: 'or',
  is: "eq",
  is_not: "ne",
};

export const SUPPORTED_OPERATORS = {
  ...SUPPORTED_OPERATORS_SCALAR,
  ...SUPPORTED_OPERATORS_COLLECTION,
};

export const RESULT_OPERATORS = {
  _offset: "_offset: Int",
  _limit: "_limit: Int",
  _orderBy: "_orderBy: [[String!]!]",
  _groupBy: "_group: [String!]",
};

export default class Inputs {
  generateScalarTypes() {
    return `
        scalar Time
        scalar DateTime
        scalar Date
        scalar JSON
        scalar JSONB
      `;
  }

  generateInputTypeOperator(type: string): string {
    if (!SUPPORTED_TYPES[type])
      throw new Error("unsupported graphql type: ".concat(type));

    return `input _input${type}Operator {
            ${Object.keys(SUPPORTED_OPERATORS_SCALAR)
              .map((op) => `${op}: ${type}`)
              .concat(
                Object.keys(SUPPORTED_OPERATORS_COLLECTION).map(
                  (op) => `${op}: [${type}]`
                )
              )
              .join("\n")}
        }`;
  }

  generateInputWhere(meta: SchemaMetaModelType) {
    return `input _inputWhere${meta.typeName} {
        ${Object.entries(meta.model.fields)
          .map(([name, field]) => `${name}: _input${field.type}Operator`)
          .concat(
            Object.entries(meta.model.associations)
              .filter(([_, association]) => "belongsTo" in association)
              .map(
                ([name, association]: [string, ModelConfigAssociationType]) => {
                  if ("field" in association)
                    return `${association.field.fk}: _inputIDOperator`;

                  return `${name}Id: _inputIDOperator`;
                }
              )
          )
          .concat(Object.values(RESULT_OPERATORS))
          .join("\n")}
    }`;
  }
  generateInputCreate(meta: SchemaMetaModelType) {
    return `input _inputCreate${meta.typeName} {
        ${Object.entries(meta.model.fields)
          .map(([name, field]) => {
            const nullable = !!field?.nullable ? "" : "!";
            return `${name}: ${field.type}${nullable}`;
          })
          .concat(
            Object.entries(meta.model.associations)
              .filter(([_, association]) => "belongsTo" in association)
              .map(
                ([name, association]: [string, ModelConfigAssociationType]) => {
                  if ("field" in association)
                    return `${association.field.fk}: ID`;

                  return `${name}Id: ID`;
                }
              )
          )}
    }`;
  }

  generateInputUpdate(meta: SchemaMetaModelType) {
    return `input _inputUpdate${meta.typeName} {
        ${Object.entries(meta.model.fields)
          .filter(([_, field]) => !field.primary)
          .map(([name, field]) => {
            return `${name}: ${field.type}`;
          })
          .concat(
            Object.entries(meta.model.associations)
              .filter(([_, association]) => "belongsTo" in association)
              .map(
                ([name, association]: [string, ModelConfigAssociationType]) => {
                  if ("field" in association)
                    return `${association.field.fk}: ID`;

                  return `${name}Id: ID`;
                }
              )
          )}
    }`;
  }

  generateInputsTypeOperator() {
    return Object.keys(SUPPORTED_TYPES)
      .map((type) => this.generateInputTypeOperator(type))
      .join("\n");
  }
}
