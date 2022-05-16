import { deepEqual } from "assert";
import { defu } from "defu";

import * as ObjModels from "../models";
import SchemaGenerator, { DEFAULT_MODEL } from ".";

const models = Object.values(ObjModels);

describe("Schema suite", () => {
  describe("Mode names", () => {
    const expectedTagsMeta = {
      name: "tags",
      plural: "tags",
      singular: "tag",
      tableName: "tags",
      typeName: "Tag",
      model: defu(ObjModels.tags, DEFAULT_MODEL),
    };
    const expectedAddressesMeta = {
      name: "addresses",
      plural: "addresses",
      singular: "address",
      tableName: "addresses",
      typeName: "Address",
      model: defu(ObjModels.addresses, DEFAULT_MODEL),
    };

    const expectedCustomerMeta = {
      name: "customers",
      plural: "customers",
      singular: "customer",
      tableName: "customers",
      typeName: "Customer",
      model: defu(ObjModels.customers, DEFAULT_MODEL),
    };

    it("Get model name", () => {
      const schema = new SchemaGenerator(models);

      deepEqual(schema.getMetaModel(ObjModels.customers), expectedCustomerMeta);
    });

    it("Get model names", () => {
      const schema = new SchemaGenerator(models);
      const expected = {
        [expectedTagsMeta.name]: expectedTagsMeta,
        [expectedAddressesMeta.name]: expectedAddressesMeta,
        [expectedCustomerMeta.name]: expectedCustomerMeta,
      };
      deepEqual(schema.getMetaModels(), expected);
    });
  });
});
