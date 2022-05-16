// import pluralize from "pluralize";
var pluralize = require("pluralize");
import { defu } from "defu";

import {
  ModelType,
  SchemaMetaModelType,
  SchemaMetaModelsType,
  ModelConfigAssociationNameTypeBelongsTo,
  ModelConfigAssociationNameTypeHasMany,
  ModelConfigAssociationNameTypeHasManyToMany,
} from "./../types";

const DEFAULT_MIDDLEWARE = f => f


export const DEFAULT_MODEL = {
  associations: {},
  middlewares: {
    all: DEFAULT_MIDDLEWARE,
    get: DEFAULT_MIDDLEWARE,
    count: DEFAULT_MIDDLEWARE,
    create: DEFAULT_MIDDLEWARE,
    update: DEFAULT_MIDDLEWARE,
    delete: DEFAULT_MIDDLEWARE,
    subscribe: DEFAULT_MIDDLEWARE,
  },
  datasource: {
    all: 'DB',
    get: 'DB',
    count: 'DB',
    update: 'DB',
    create: 'DB',
    delete: 'DB',
  },
  generate: {
    all: true,
    get: true,
    count: true,
    update: true,
    create: true,
    delete: true,
    subscribe: true,
  },
};

import InputsGenerator from "./generator/inputs";
import TypesGenerator from "./generator/types";

export default class Schema {
  metaModels: SchemaMetaModelsType = {} as SchemaMetaModelsType;

  constructor(models: ModelType[]) {
    this.metaModels = models.reduce((acc, model) => {
      const modelName = this.getMetaModel(model);
      return { ...acc, [modelName.name]: modelName };
    }, {});
  }

  getMeta(name: string): SchemaMetaModelType {
    return this.metaModels[name];
  }

  getMetaModel(model: ModelType): SchemaMetaModelType {
    const plural = pluralize.plural(model.name || model.tableName);
    const singular = pluralize.singular(model.name || model.tableName);
    const tableName = model.tableName || plural;

    return {
      name: model.name || plural,
      plural,
      singular,
      tableName,
      typeName: singular.charAt(0).toUpperCase() + singular.slice(1),
      model: defu(model, DEFAULT_MODEL),
    };
  }

  getMetaModels(): SchemaMetaModelsType {
    return this.metaModels;
  }

  generateSchema() {
    const inputs = new InputsGenerator();
    const types = new TypesGenerator(this);

    return `
      ${inputs.generateScalarTypes()}
      ${inputs.generateInputsTypeOperator()}
      ${Object.entries(this.metaModels)
        .flatMap(([name, meta]) => [
          inputs.generateInputWhere(meta),
          inputs.generateInputCreate(meta),
          inputs.generateInputUpdate(meta),
          types.generateType(name),
        ])
        .join("\n")}
      ${types.generateQueryType()}
      ${types.generateMutationType()}
    `;
  }
}
