import * as jose from "jose";
const JWT_SECRET = new Uint8Array(391572);
const JWT_ISSUER = "Graphql:Stratus:Yoga:Example";
const JWT_AUDIENCE = "only4:stratus:yoga:example:v1";

export default function (next) {
  return async (source, params, context) => {
    const { where } = params;
    const Token = where.Token.eq;

    const { payload } = await jose.jwtVerify(Token, JWT_SECRET, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });

    return {
      Audience: JWT_AUDIENCE,
      Token,
      ...payload,
    };
  };
}
