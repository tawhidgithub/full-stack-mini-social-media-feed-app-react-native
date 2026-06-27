import jwt, { Secret, SignOptions } from "jsonwebtoken";

const generateToken = (userId: string): string => {
  const secret: Secret = process.env.JWT_SECRET as string;

  const options: SignOptions = {
    expiresIn: "7d",
  };

  return jwt.sign({ userId }, secret, options);
};

export default generateToken;
