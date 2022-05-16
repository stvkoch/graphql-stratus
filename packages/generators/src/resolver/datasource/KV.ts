import { DataSourceType } from "./../../types";

export default (KV): DataSourceType => ({
  association: (params, meta) => {},
  get: (params, meta) => KV({ email: meta.name }),
  all: (params, meta) => KV({ email: meta.name }),
  count: (params, meta) => KV({ email: meta.name }),
  create: (params, meta) => KV({ email: meta.name }),
  update: (params, meta) => KV({ email: meta.name }),
  delete: (params, meta) => KV({ email: meta.name }),
});
