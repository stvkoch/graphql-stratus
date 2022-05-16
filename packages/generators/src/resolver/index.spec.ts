import { graphql, buildSchema } from "graphql";
import { equal, deepEqual } from "assert";
import { defu } from "defu";
import { format as prettierFormat } from "prettier";

import * as ObjModels from "../models";
import SchemaGenerator from "./../schema";
import ResolverGenerator from "./";
import ApolloResolver from "./server/graphql";
import GraphqlResolver from "./server/graphql";
import { DataSourcesType } from "./../types";
import D1DataSource from "./datasource/D1";
import KVDataSource from "./datasource/KV";

const DB = {
  get: (sql, params) => ({
    id: 1,
    name: sql,
    email: "test@test.com",
    customer: null,
  }),
  exec: (sql, params) => ({
    id: 2,
    name: sql,
    email: "test",
  }),
};
const KV = {
  get: (key) => ({
    id: 1,
    name: key,
    email: "test@test.com",
  }),
  put: (key, value) => ({
    id: 2,
    name: key,
    email: value,
  }),
  delete: (key) => ({
    id: 3,
    name: key,
    email: "deleted",
  }),
};

const models = Object.values(ObjModels);

// const r = {
//   Query: {
//     customer(){
//       return {id: 10,name: '10', email: '10'}
//     }
//   }
// }

describe("Resolver suite", () => {
  describe("Hello", () => {
    it("Basic", () => {
      const schemaGenerator = new SchemaGenerator(models);
      const resolverGenerator = new ResolverGenerator({
        metaModels: schemaGenerator.getMetaModels(),
        resolver: new GraphqlResolver(
          {
            DB: D1DataSource(DB),
            KV: KVDataSource(KV),
          },
          schemaGenerator.getMetaModels()
        ),
      });

      const schema = schemaGenerator.generateSchema();
      const rootValue = resolverGenerator.generateResolvers();
      const source = `query { customer( where: { id: {eq: 1}} ) {
        id
        name
        email
      } }`;

      graphql({ schema: buildSchema(schema), source, rootValue }).then(
        (response) => {
          console.log(response);
        }
      );
    });
  });
});
