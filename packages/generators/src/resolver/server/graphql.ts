import {
  ServerResolverType,
  DataSourcesType,
  SchemaMetaModelsType,
  SchemaMetaModelType,
} from "../../types";

export default class Graphql implements ServerResolverType {
  datasource?: DataSourcesType = null;
  metaModels?: SchemaMetaModelsType = null;

  constructor(datasource: DataSourcesType, metaModels: SchemaMetaModelsType) {
    this.datasource = datasource;
    this.metaModels = metaModels;
  }

  resolveAssociation(meta, name, count) {
    return (source, { where }, context) => {
    

      const association = meta.model.associations[name];
      let associationType = "belongsTo";
      let associationName = null;
      if ("belongsTo" in association) {
        associationName = association.belongsTo;
      } else if ("hasOne" in association) {
        associationName = association.hasMany;
        associationType = "hasOne";
      } else if ("hasMany" in association) {
        associationName = association.hasMany;
        associationType = "hasMany";
      } else if ("hasManyToMany" in association) {
        associationName = association.hasManyToMany;
        associationType = "hasManyToMany";
      }

      const through = association.through || associationName;

      const associationMetaModel: SchemaMetaModelType =
        this.metaModels[associationName];
      const datasource =
        association.datasource || associationMetaModel.model.datasource.get;

      const params = {
        where,
        name,
        associationMetaModel,
        association,
        through,
        associationType,
        datasource,
        count,
      };

      return this.datasource[datasource].association(
        params,
        meta,
        source,
        context
      );
    };
  }
  resolverGet(meta) {
    return meta.model.middlewares.get.call(
      this,
      (source, params, context) => {
        return this.datasource[meta.model.datasource.get].get(
          params,
          meta,
          source,
          context
        );
      }
    );
  }

  resolverAll(meta) {
    return meta.model.middlewares.all.call(
      this,
      (source, params, context) =>
        this.datasource[meta.model.datasource.all].all(
          params,
          meta,
          source,
          context
        )
    );
  }

  resolverCount(meta) {
    return meta.model.middlewares.count.call(
      this,
      (source, params, context) => {
        return this.datasource[meta.model.datasource.count].count(
          params,
          meta,
          source,
          context
        );
      }
    );
  }

  resolverCreate(meta) {
    return meta.model.middlewares.create.call(
      this,
      (source, params, context) =>
        this.datasource[meta.model.datasource.create].create(
          params,
          meta,
          source,
          context
        )
    );
  }

  resolverUpdate(meta) {
    return meta.model.middlewares.update.call(
      this,
      (source, params, context) =>
        this.datasource[meta.model.datasource.update].update(
          params,
          meta,
          source,
          context
        )
    );
  }

  resolverDelete(meta) {
    return meta.model.middlewares.delete.call(
      this,
      (source, params, context) =>
        this.datasource[meta.model.datasource.delete].delete(
          params,
          meta,
          source,
          context
        )
    );
  }
}
