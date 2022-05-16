export type GStratusRowType = {
  [key: string]: any;
};

export type ResultType = GStratusRowType[];

export type ErrorResultType = GStratusRowType | Boolean;

export type ClientType = {
  get: (sql: string, params: any) => Promise<ResultType>;
  exec?: (
    sql: string,
    params: any
  ) => Promise<Boolean | ErrorResultType>;
  set?: (
    sql: string,
    params: any
  ) => Promise<Boolean | ErrorResultType>;
  del?: (
    sql: string,
    params: any
  ) => Promise<Boolean | ErrorResultType>;
};
