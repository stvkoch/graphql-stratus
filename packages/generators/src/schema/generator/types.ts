import {
  ModelConfigAssociationNameTypeBelongsTo,
  ModelConfigAssociationNameTypeHasMany,
  ModelConfigAssociationNameTypeHasManyToMany,
} from "../../types";
import SchemaGenerator from "../";
import cap from "./../../utils/capitalize";

export const DEFAULT_MODEL = {
  associations: {},
  middlewares: {
    all: [],
    get: [],
    create: [],
    update: [],
    delete: [],
    subscribe: [],
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

export default class Types {
  schema: SchemaGenerator = null;

  constructor(schema: SchemaGenerator) {
    this.schema = schema;
  }

  generateType(name: string): string {
    const meta = this.schema.getMeta(name);
    // @TODO optimize it
    const getAssocionationName = (name: string) => {
      const association = meta.model.associations[name];
      let associationName = "";
      if ("belongsTo" in association) {
        associationName = (
          association as ModelConfigAssociationNameTypeBelongsTo
        ).belongsTo;
      }
      if ("hasMany" in association) {
        associationName = (association as ModelConfigAssociationNameTypeHasMany)
          .hasMany;
      }
      if ("hasManyToMany" in association) {
        associationName = (
          association as ModelConfigAssociationNameTypeHasManyToMany
        ).hasManyToMany;
      }
      return this.schema.getMeta(associationName);
    };
    const isSingle = (association) => {
      if ("belongsTo" in meta.model.associations[association]) {
        return true;
      }
      return false;
    };
    const getAssocionationType = (association: string) => {
      const metaAssociation = getAssocionationName(association);
      return isSingle(association)
        ? `${metaAssociation.typeName}`
        : `[${metaAssociation.typeName}]`;
    };

    return `type ${meta.typeName} {\n${Object.keys(meta.model.fields)
      .filter((name) => meta.model.fields[name].generate !== false)
      .map(
        (name) =>
          `${name}: ${meta.model.fields[name].type}${
            meta.model.fields[name].nullable ? "" : "!"
          }`
      )
      .concat(
        Object.keys(meta.model.associations)
          .filter((name) => meta.model.associations[name].generate !== false)
          .flatMap((association) => [
            `${association}(where: _inputWhere${cap(
              getAssocionationName(association).typeName
            )}): ${getAssocionationType(association)}`,
            isSingle(association)
              ? ""
              : `_${association.toLocaleLowerCase()}Count(where: _inputWhere${cap(
                  getAssocionationName(association).typeName
                )}): Int!`,
          ])
      )
      .join("\n")}\n}`;
  }

  generateQueryGet(name: string): string {
    const meta = this.schema.getMeta(name);
    if (meta.model.generate.get === false) return "";
    return `${meta.singular}(where: _inputWhere${meta.typeName}): ${meta.typeName}`;
  }

  generateQueryAll(name: string): string {
    const meta = this.schema.getMeta(name);
    if (meta.model.generate.all === false) return "";
    return `${meta.plural}(where: _inputWhere${meta.typeName}): [${meta.typeName}!]!`;
  }

  generateQueryCount(name: string): string {
    const meta = this.schema.getMeta(name);
    if (meta.model.generate.count === false) return "";
    return `_${meta.plural}Count(where: _inputWhere${meta.typeName}): Int!`;
  }

  generateMutationCreate(name: string): string {
    const meta = this.schema.getMeta(name);
    if (meta.model.generate.create === false) return "";
    return `create${cap(meta.typeName)}(input: _inputCreate${meta.typeName}): ${
      meta.typeName
    }!`;
  }

  generateMutationUpdate(name: string): string {
    const meta = this.schema.getMeta(name);
    if (meta.model.generate.update === false) return "";
    return `update${cap(meta.typeName)}(where: _inputWhere${
      meta.typeName
    }, input: _inputUpdate${meta.typeName}): Int!`;
  }

  generateMutationDelete(name: string): string {
    const meta = this.schema.getMeta(name);
    if (meta.model.generate.delete === false) return "";
    return `delete${cap(meta.typeName)}(where: _inputWhere${
      meta.typeName
    }): Int!`;
  }

  generateQueryType(): string {
    const models = this.schema.getMetaModels();
    return `type Query {
          ${Object.values(models)
            .flatMap((model) => [
              this.generateQueryGet(model.name),
              this.generateQueryAll(model.name),
              this.generateQueryCount(model.name),
            ])
            .join("\n")}
      }`;
  }

  generateMutationType(): string {
    const models = this.schema.getMetaModels();
    return `type Mutation {
          ${Object.values(models)
            .flatMap((model) => [
              this.generateMutationCreate(model.name),
              this.generateMutationUpdate(model.name),
              this.generateMutationDelete(model.name),
            ])
            .join("\n")}
      }`;
  }
}
