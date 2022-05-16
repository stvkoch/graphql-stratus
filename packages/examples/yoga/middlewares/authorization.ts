const roles = {
  admin: ["*"],
  others: ["count", "all", "get"],
};

export default (model, op) =>
  function (next) {
    return (source, params, context) => {
      const userRole = "user_role"; // context.user.role;
      const hasAutorization = roles[userRole] && roles[userRole].includes(op);
      if (!hasAutorization)
        console.error("USER NO HAVE AUTHORIZATION TO ACCESS " + [model,op].join(':'));

      return next(source, params, context);
    };
  };
