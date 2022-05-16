import { ok, equal, notEqual, throws } from "assert";
import { format as prettierFormat } from "prettier";
import * as sqlBuildOperators from "sql-query/lib/Comparators";

import InputGenerator, {
  SUPPORTED_OPERATORS,
  SUPPORTED_OPERATORS_SCALAR,
  SUPPORTED_OPERATORS_COLLECTION,
  SUPPORTED_TYPES,
} from "./inputs";
import SchemaGenerator from "../";

import * as ObjModels from "../../models";
const models = Object.values(ObjModels);

describe("Input suite", () => {
  it("Operators should be supported by sqlBuilder", () => {
    Object.entries(SUPPORTED_OPERATORS).forEach(([op, sqlBuildOp]) => {
      ok(
        sqlBuildOperators[sqlBuildOp],
        `${op} no match with sqlBuild ${sqlBuildOp}`
      );
    });
  });

  it("Inspect _inputIDOperator", () => {
    const expectedInputOperator = prettierFormat(
      `
        input _inputIDOperator {
            like: ID
            not_like: ID
            eq: ID
            ne: ID
            gt: ID
            gte: ID
            lt: ID
            lte: ID
            between: [ID]
            not_between: [ID]
            in: [ID]
            not_in: [ID]
            not: [ID]
            is: [ID]
            is_not: [ID]
        }
    `,
      { parser: "graphql" }
    );
    const inputs = new InputGenerator();
    equal(
      prettierFormat(inputs.generateInputTypeOperator("ID"), {
        parser: "graphql",
      }),
      expectedInputOperator
    );
  });

  it("Throw a error for unsupported input", () => {
    const inputs = new InputGenerator();
    throws(() => inputs.generateInputTypeOperator("CUMULUS"));
  });

  describe("Inpect _inputTypeOperator", () => {
    it("Same amount of supported operators", () => {
      const inputs = new InputGenerator();
      let _inputTypeOperator = null;
      Object.keys(SUPPORTED_TYPES).forEach((input) => {
        _inputTypeOperator = inputs.generateInputTypeOperator(input);

        equal(
          Object.keys(SUPPORTED_OPERATORS).length,
          _inputTypeOperator.match(new RegExp(":", "g")).length
        );
        equal(
          Object.keys(SUPPORTED_OPERATORS_SCALAR).length,
          _inputTypeOperator.match(new RegExp(`: ${input}`, "g")).length
        );
        equal(
          Object.keys(SUPPORTED_OPERATORS_COLLECTION).length,
          _inputTypeOperator.match(new RegExp(`: \\[${input}\\]`, "g")).length
        );
      });
      notEqual(_inputTypeOperator, null);
    });
  });

  describe("inpect inputWhere input", () => {
    it("should generate _inputWhereCustomer", () => {
      const schema = new SchemaGenerator(models);
      const inputs = new InputGenerator();
      const expected = `input _inputWhereCustomer {
            id: _inputIDOperator
            name: _inputStringOperator
            email: _inputStringOperator
            _offset: Int
            _limit: Int
            _orderBy: [[String!]!]
            _group: [String!]

        }`;

      const inputCreate = inputs.generateInputWhere(
        schema.getMeta("customers")
      );

      equal(
        prettierFormat(inputCreate, { parser: "graphql" }),
        prettierFormat(expected, { parser: "graphql" })
      );
    });

    it("should generate _inputWhereAddress", () => {
      const schema = new SchemaGenerator(models);
      const inputs = new InputGenerator();
      const expected = `input _inputWhereAddress {
            name: _inputStringOperator
            city: _inputStringOperator
            customerId: _inputIDOperator
            _offset: Int
            _limit: Int
            _orderBy: [[String!]!]
            _group: [String!]
        }`;

      const inputCreate = inputs.generateInputWhere(
        schema.getMeta("addresses")
      );

      equal(
        prettierFormat(inputCreate, { parser: "graphql" }),
        prettierFormat(expected, { parser: "graphql" })
      );
    });
  });

  describe("inpect inputCreate input", () => {
    it("should generate _inputCreateCustomer", () => {
      const schema = new SchemaGenerator(models);
      const inputs = new InputGenerator();
      const expected = `input _inputCreateCustomer {
            id: ID!
            name: String!
            email: String
        }`;

      const inputCreate = inputs.generateInputCreate(
        schema.getMeta("customers")
      );

      equal(
        prettierFormat(inputCreate, { parser: "graphql" }),
        prettierFormat(expected, { parser: "graphql" })
      );
    });

    it("should generate _inputCreateAddress", () => {
      const schema = new SchemaGenerator(models);
      const inputs = new InputGenerator();
      const expected = `input _inputCreateAddress {
            name: String!
            city: String
            customerId: ID
        }`;

      const inputCreate = inputs.generateInputCreate(
        schema.getMeta("addresses")
      );

      equal(
        prettierFormat(inputCreate, { parser: "graphql" }),
        prettierFormat(expected, { parser: "graphql" })
      );
    });
  });

  describe("inpect inputUpdate input", () => {
    it("should generate _inputUpdateCustomer", () => {
      const schema = new SchemaGenerator(models);
      const inputs = new InputGenerator();
      const expected = `input _inputUpdateCustomer {
            name: String
            email: String
        }`;

      const inputCreate = inputs.generateInputUpdate(
        schema.getMeta("customers")
      );

      equal(
        prettierFormat(inputCreate, { parser: "graphql" }),
        prettierFormat(expected, { parser: "graphql" })
      );
    });

    it("should generate _inputUpdateAddress", () => {
      const schema = new SchemaGenerator(models);
      const inputs = new InputGenerator();
      const expected = `input _inputUpdateAddress {
            name: String
            city: String
            customerId: ID
        }`;

      const inputCreate = inputs.generateInputUpdate(
        schema.getMeta("addresses")
      );

      equal(
        prettierFormat(inputCreate, { parser: "graphql" }),
        prettierFormat(expected, { parser: "graphql" })
      );
    });
  });
});
