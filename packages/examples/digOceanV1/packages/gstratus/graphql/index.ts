import { ApolloServer } from "./ApolloServer";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import fs from "fs";
import path from "path";
import { Pool } from "pg";

import * as objModels from "./../../../../models";
import {
  SchemaGenerator,
  ResolverGenerator,
  GraphqlResolver,
  SQLDataSource,
} from "@graphql-stratus/generators";
import pgClient from "@graphql-stratus/clients/lib/pg";

const models = Object.values(objModels);
const schemaGenerator = new SchemaGenerator(models);
const resolverGenerator = new ResolverGenerator({
  metaModels: schemaGenerator.getMetaModels(),
  resolver: new GraphqlResolver(
    {
      ...SQLDataSource(
        'DB',
        pgClient(
          new Pool({
            user: process.env.USERNAME,
            host: process.env.HOSTNAME,
            database: process.env.DATABASE,
            password: process.env.PASSWORD,
            port: Number(process.env.PORT),
            ssl: {
              rejectUnauthorized: false,
              ca: process.env.CA_CERT,
            },
          })
        )
      ),
    },
    schemaGenerator.getMetaModels()
  ),
});
const typeDefs = schemaGenerator.generateSchema();
const resolvers = resolverGenerator.generateResolvers();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // introspection: true,
  // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const handler = server.createHandler();

export const main = handler;
