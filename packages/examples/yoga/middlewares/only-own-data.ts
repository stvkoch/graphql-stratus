export default function (next) {
  return (source, params, context) => {
    const newParams = {
      ...params,
      where: {
        ...params.where,
        // CompanyId: { eq: context.user.CompanyId },
      },
    };

    return next(source, newParams, context);
  };
}
