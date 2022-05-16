export default {
  get: (sql, params) => {
    return Promise.resolve({
      Id: 1,
      name: sql,
      email: "test@test.com",
      customer: null,
    });
  },
  exec: (sql, params) => Promise.resolve({
    Iid: 2,
    name: sql,
    email: "test",
  }),
};
