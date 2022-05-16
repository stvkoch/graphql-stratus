
export default function (next) {
    return (source, params, context) => {
        if (!context.user) {
            console.error('USER NOT AUTHENTICATED TO ACCESS ')
        }

      return next(source, params, context);
    };
  };