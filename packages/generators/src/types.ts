export type ModelConfigFieldType = {
  type: string;
  default?: string | null | boolean | number;
  nullable?: boolean;
  primary?: boolean;
  generate?: Boolean;
};
export type ModelFieldType = {
  [key: string]: ModelConfigFieldType;
};

export type ModelConfigAssociationNameTypeHasMany = {
  hasMany: string;
};

export type ModelConfigAssociationNameTypeHasManyToMany = {
  hasManyToMany: string;
};

export type ModelConfigAssociationNameTypeBelongsTo = {
  belongsTo: string;
};

export type ModelConfigAssociationNameType =
  | ModelConfigAssociationNameTypeHasMany
  | ModelConfigAssociationNameTypeHasManyToMany
  | ModelConfigAssociationNameTypeBelongsTo;

export type ModelAssociationFieldType = {
  fk?: string;
  k?: string;
};
export type ModelConfigAssociationType = ModelConfigAssociationNameType & {
  through?: string;
  parentKey?: ModelAssociationFieldType;
  field?: ModelAssociationFieldType;
  generate?: Boolean;
};

export type ModelAssociationType = {
  [key: string]: ModelConfigAssociationType;
};

export type MiddlewareType = (...args: unknown[]) => unknown;

export type ModelMiddlewareType = {
  all?: MiddlewareType;
  get?: MiddlewareType;
  count?: MiddlewareType;
  create?: MiddlewareType;
  update?: MiddlewareType;
  delete?: MiddlewareType;
  subscribe?: MiddlewareType;
};

export type ModelGenerateType = {
  all?: boolean;
  get?: boolean;
  count?: boolean;
  create?: boolean;
  update?: boolean;
  delete?: boolean;
  subscribe?: boolean;
};

export type ModelDatasourceType = {
  all?: string;
  get?: string;
  count?: string;
  create?: string;
  update?: string;
  delete?: string;
  subscribe?: string;
};

export type ModelType = {
  name: string;
  tableName: string;
  fields: ModelFieldType;
  associations?: Partial<ModelAssociationType>;
  datasource?: Partial<ModelDatasourceType>;
  middlewares?: Partial<ModelMiddlewareType>;
  generate?: Partial<ModelGenerateType>;
};

export type SchemaMetaModelType = {
  name: string;
  plural: string;
  singular: string;
  tableName: string;
  typeName: string;
  model: ModelType;
};

export type SchemaMetaModelsType = {
  [key: string]: SchemaMetaModelType;
};

export type ServerResolverType = {
  resolveAssociation: (
    meta: SchemaMetaModelType,
    name: string,
    count?: string
  ) => (...args: any[]) => any;
  resolverGet: (meta: SchemaMetaModelType) => (...args: any[]) => any;
  resolverAll: (meta: SchemaMetaModelType) => (...args: any[]) => any;
  resolverCount: (meta: SchemaMetaModelType) => (...args: any[]) => any;
  resolverCreate: (meta: SchemaMetaModelType) => (...args: any[]) => any;
  resolverUpdate: (meta: SchemaMetaModelType) => (...args: any[]) => any;
  resolverDelete: (meta: SchemaMetaModelType) => (...args: any[]) => any;
};
// export type ResolverMiddlewareType = (args: any[]) => any;
export type ResolverOptionsType = {
  // middlewares: (next: ResolverMiddlewareType) => any;
  resolver: ServerResolverType;
  metaModels: SchemaMetaModelsType;
};
export type DataSourceType = {
  association: (
    params: any,
    meta: SchemaMetaModelType,
    source?: any,
    context?: any
  ) => any;
  get: (
    params: any,
    meta: SchemaMetaModelType,
    source?: any,
    context?: any
  ) => any;
  all: (
    params: any,
    meta: SchemaMetaModelType,
    source?: any,
    context?: any
  ) => any;
  count: (
    params: any,
    meta: SchemaMetaModelType,
    source?: any,
    context?: any
  ) => any;
  create: (
    params: any,
    meta: SchemaMetaModelType,
    source?: any,
    context?: any
  ) => any;
  update: (
    params: any,
    meta: SchemaMetaModelType,
    source?: any,
    context?: any
  ) => any;
  delete: (
    params: any,
    meta: SchemaMetaModelType,
    source?: any,
    context?: any
  ) => any;
};
export type DataSourcesType = {
  [key: string]: DataSourceType | any;
};
