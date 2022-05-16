import defu from "defu";
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";
import { GraphQLDate, GraphQLDateTime, GraphQLTime } from "graphql-iso-date";

import cap from "./../utils/capitalize";

import { ResolverOptionsType } from "../types";
import ApolloResolver from "./server/graphql";

export default class Resolver {
  options: ResolverOptionsType;

  constructor(options = {}) {
    this.options = defu(options, this.options);
  }

  generateResolvers(additionalResolvers = {}) {
    const resolvers = {
      JSON: GraphQLJSON,
      JSONB: GraphQLJSONObject,
      Date: GraphQLDate,
      Time: GraphQLTime,
      DateTime: GraphQLDateTime,
      ...additionalResolvers,
    };

    const { resolver, metaModels } = this.options;

    return defu(resolvers, {
      ...Object.values(metaModels).reduce((acc1, meta) => {
        const associations = meta.model.associations;
        return {
          ...acc1,
          [meta.typeName]: Object.keys(associations)
            .filter((name) => meta.model.associations[name].generate !== false)
            .reduce((acc2, name) => {
              const isSingle = "belongsTo" in meta.model.associations[name];

              return {
                ...acc2,
                [name]: resolver.resolveAssociation(meta, name),
                ...(isSingle
                  ? {}
                  : {
                      [`_${name}Count`]: resolver.resolveAssociation(
                        meta,
                        name,
                        "count"
                      ),
                    }),
              };
            }, {}),
        };
      }, {}),
      Query: Object.values(metaModels).reduce((acc, meta) => {
        if (meta.model.generate.get !== false)
          acc[meta.singular] = resolver.resolverGet(meta);
        if (meta.model.generate.all !== false)
          acc[meta.plural] = resolver.resolverAll(meta);
        if (meta.model.generate.count !== false)
          acc[`_${meta.plural}Count`] = resolver.resolverCount(meta);

        return acc;
      }, {}),
      Mutation: Object.values(metaModels).reduce((acc, meta) => {
        if (meta.model.generate.create !== false)
          acc[`create${cap(meta.singular)}`] = resolver.resolverCreate(meta);
        if (meta.model.generate.update !== false)
          acc[`update${cap(meta.singular)}`] = resolver.resolverUpdate(meta);
        if (meta.model.generate.delete !== false)
          acc[`delete${cap(meta.singular)}`] = resolver.resolverDelete(meta);
        return acc;
      }, {}),
    });
  }
}
