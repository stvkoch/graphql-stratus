const sqlite3 = require("sqlite3");

import { ClientType, ResultType, ErrorResultType } from "./types";

export default (file): ClientType => {
  const client = new sqlite3.Database(file);

  return {
    get(sql, params) {
      return new Promise<ResultType>((r, e) =>
        client.all(sql, params, (err, rows) => {
          if (err) {
            return e(err);
          }

          r(rows);
        })
      );
    },
    exec(sql, params) {
      return new Promise<ResultType | ErrorResultType>((r, e) =>
        client.exec(sql, (err) => {
          if (err) return e(err);
          r(true);
        })
      );
    },
  };
};
