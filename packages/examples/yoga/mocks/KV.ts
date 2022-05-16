
export default {
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