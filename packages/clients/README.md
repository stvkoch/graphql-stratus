# STRATUS Clients


Define a client follow the interface of stratus Clients


```
export type ClientType = {
  get: (sql: string, params: any) => Promise<ResultType>;
  exec: (
    sql: string,
    params: any
  ) => Promise<Boolean | ErrorResultType>;
};
```

Any client used inside of datasource should follow the ClientType interface to get access and run commands


