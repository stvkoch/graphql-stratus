import {
  ClientType
} from "./types";

export default (client): ClientType => {
  return {
    get(sql, params) {
       return client.query(sql, params).then(result => result.rows)
    },
    exec(sql, params) {
      return client.query(sql, params).then(Boolean)
    },
  };
};
