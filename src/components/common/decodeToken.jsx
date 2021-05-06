import jwt from "jsonwebtoken";
const decodeToken = (token) => {
  return jwt.decode(token, { complete: true });
};

export default decodeToken;
