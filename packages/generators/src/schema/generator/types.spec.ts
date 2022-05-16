import { graphql, buildSchema } from "graphql";
import { equal, deepEqual } from "assert";
import { defu } from "defu";
import { format as prettierFormat } from "prettier";

import * as ObjModels from "../../models";
import SchemaGenerator, { DEFAULT_MODEL } from "../";
import TypeGenerator from "./types";

const models = Object.values(ObjModels);

// const rootValue = { hello: () => "Hello world!" };
// const source = "{ hello }";

describe("Types From Models", () => {
  // it("Get models", () => {
  // const schema = new SchemaGenerator(models);
  // equal(schema.getModels(), models);
  // graphql({ schema, source, rootValue }).then((response: any) => {
  //   equal(response.data.hello, 'Hello word!');
  //   done()
  // });
  // });

  describe("inpect Type from models", () => {
    it("Schema with hasManyToMany Type", () => {
      const schema = new SchemaGenerator(models);
      const types = new TypeGenerator(schema);

      const expected = `
        type Tag {
          name: String!
          customers(where: _inputWhereCustomer): [Customer]
         _customersCount(where: _inputWhereCustomer): Int!
         addresses(where: _inputWhereAddress): [Address]
         _addressesCount(where: _inputWhereAddress): Int!

        }
        `;
      const schemaType = types.generateType("tags");
      equal(
        prettierFormat(schemaType, { parser: "graphql" }),
        prettierFormat(expected, { parser: "graphql" })
      );
    });

    it("Schema with belongsTo Type", () => {
      const schema = new SchemaGenerator(models);
      const types = new TypeGenerator(schema);

      const expected = `
        type Address {
          name: String!
          city: String
          customer(where: _inputWhereCustomer): Customer
        }
        `;
      const schemaType = types.generateType("addresses");
      equal(
        prettierFormat(schemaType, { parser: "graphql" }),
        prettierFormat(expected, { parser: "graphql" })
      );
    });

    it("Schema with hasMany Type", () => {
      const schema = new SchemaGenerator(models);
      const types = new TypeGenerator(schema);

      const expected = `
        type Customer {
          id: ID!
          name: String!
          email: String,
          addresses(where: _inputWhereAddress): [Address]
          _addressesCount(where: _inputWhereAddress): Int!
        }
        `;

      const schemaType = types.generateType("customers");
      equal(
        prettierFormat(schemaType, { parser: "graphql" }),
        prettierFormat(expected, { parser: "graphql" })
      );
    });
    it.skip("@TODO not generate with unable field", () => {});
  });
});

describe("Queries from Models", () => {
  it("Query single model", () => {
    const schema = new SchemaGenerator(models);
    const types = new TypeGenerator(schema);

    const expected = `customer(where: _inputWhereCustomer): Customer`;

    const query = types.generateQueryGet("customers");
    equal(query, expected);
  });

  it("Query collection model", () => {
    const schema = new SchemaGenerator(models);
    const types = new TypeGenerator(schema);

    const expected = `customers(where: _inputWhereCustomer): [Customer!]!`;

    const query = types.generateQueryAll("customers");
    equal(query, expected);
  });

  it("Query count model", () => {
    const schema = new SchemaGenerator(models);
    const types = new TypeGenerator(schema);

    const expected = `_customersCount(where: _inputWhereCustomer): Int!`;

    const query = types.generateQueryCount("customers");
    equal(query, expected);
  });

  describe("Should not generate unable query", () => {
    it.skip("@TODO not generate query get", () => {});
    it.skip("@TODO not generate query all", () => {});
    it.skip("@TODO not generate query count", () => {});
  });
});

describe("Mutations from Models", () => {
  describe("Create", () => {
    it("Mutate model", () => {
      const schema = new SchemaGenerator(models);
      const types = new TypeGenerator(schema);

      const expected = `createCustomer(input: _inputCreateCustomer): Customer!`;

      const query = types.generateMutationCreate("customers");
      equal(query, expected);
    });
  });

  describe("Update", () => {
    it("Mutate model", () => {
      const schema = new SchemaGenerator(models);
      const types = new TypeGenerator(schema);

      const expected = `updateCustomer(where: _inputWhereCustomer, input: _inputUpdateCustomer): Customer!`;

      const query = types.generateMutationUpdate("customers");
      equal(query, expected);
    });
  });

  describe("Delete", () => {
    it("mutate model", () => {
      const schema = new SchemaGenerator(models);
      const types = new TypeGenerator(schema);

      const expected = `deleteCustomer(where: _inputWhereCustomer): Int!`;

      const query = types.generateMutationDelete("customers");
      equal(query, expected);
    });
  });
});

describe("Query Type", () => {
  it("all queries", () => {
    const schema = new SchemaGenerator(models);
    const types = new TypeGenerator(schema);
    const queries = types.generateQueryType()
    models.forEach((model) => {
      const meta = schema.getMetaModel(model);
      equal(queries.indexOf(`${meta.singular}(where`) > 0, true);
      equal(queries.indexOf(`${meta.plural}(where`) > 0, true);
      equal(queries.indexOf(`${meta.plural}Count(where`) > 0, true);
    });
  });
});
describe("Mutation Type", () => {
  it("all mutations", () => {
    const schema = new SchemaGenerator(models);
    const types = new TypeGenerator(schema);
    const mutations = types.generateMutationType()
    models.forEach((model) => {
      const meta = schema.getMetaModel(model);
      equal(mutations.indexOf(`create${meta.typeName}(input`) > 0, true);
      equal(mutations.indexOf(`update${meta.typeName}(where`) > 0, true);
      equal(mutations.indexOf(`delete${meta.typeName}(where`) > 0, true);
    });
  });
});

describe("Schema", () => {
  it("inspect schema", () => {
    const schema = new SchemaGenerator(models);
    const types = new TypeGenerator(schema);
    const mutations = types.generateMutationType()
    models.forEach((model) => {
      const meta = schema.getMetaModel(model);
      equal(mutations.indexOf(`create${meta.typeName}(input`) > 0, true);
      equal(mutations.indexOf(`update${meta.typeName}(where`) > 0, true);
      equal(mutations.indexOf(`delete${meta.typeName}(where`) > 0, true);
    });
  });
});
