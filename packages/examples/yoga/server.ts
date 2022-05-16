import "dotenv/config";
import { createServer } from "@graphql-yoga/node";
import { createClient } from "redis";

import {
  SchemaGenerator,
  ResolverGenerator,
  GraphqlResolver,
  D1DataSource,
  SQLDataSource,
  RedisDataSource,
} from "@graphql-stratus/generators";

import sqlClient from "@graphql-stratus/clients/lib/sqlite";
import redisClient from "@graphql-stratus/clients/lib/redis/hash";

import * as ObjModels from "./models";
import DB from "./mocks/DB";
const models = Object.values(ObjModels);

const redis = createClient({ url: "redis://localhost:6379" });
// await redis.connect()

const schemaGenerator = new SchemaGenerator(models);
const resolverGenerator = new ResolverGenerator({
  metaModels: schemaGenerator.getMetaModels(),
  resolver: new GraphqlResolver(
    {
      log: console.log,
      D1: D1DataSource(DB),
      ...RedisDataSource(
        "REDIS",
        redisClient(redis)
      ),
      ...SQLDataSource("DB", sqlClient("./database/Northwind_small.sqlite")),
      ...SQLDataSource(
        "MARKETDB",
        sqlClient("./database/Northwind_small_customers.sqlite")
      ),
    },
    schemaGenerator.getMetaModels()
  ),
});

const typeDefs = schemaGenerator.generateSchema();
const resolvers = resolverGenerator.generateResolvers();

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
});

server.start();
