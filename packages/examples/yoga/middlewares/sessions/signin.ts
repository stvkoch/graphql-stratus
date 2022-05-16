import * as jose from "jose";
const JWT_SECRET = new Uint8Array(391572);
const JWT_ISSUER = "Graphql:Stratus:Yoga:Example";
const JWT_AUDIENCE = "only4:stratus:yoga:example:v1";

export default function (next) {
  return async (source, params, context) => {
    const { input } = params;

    const customer = await this.datasource.MARKETDB.get(
      {
        where: {
          Id: { eq: input.Username },
          City: { eq: input.Password },
        },
      },
      this.metaModels.customers
    );

    if (customer) {
      const jwt = await new jose.SignJWT({ CustomerId: customer.Id })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setIssuer(JWT_ISSUER)
        .setAudience(JWT_AUDIENCE)
        .setExpirationTime("32h")
        .sign(JWT_SECRET);

      return {
        Audience: JWT_AUDIENCE,
        Token: jwt,
        CustomerId: customer.Id,
        customer,
      };
    }

    // return next(source, params, context);
  };
}
