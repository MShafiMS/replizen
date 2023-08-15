import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

interface CustomNextApiRequest extends NextApiRequest {
  decoded?: any;
}

const verifyAccess =
  (handler: (req: CustomNextApiRequest, res: NextApiResponse) => void) =>
  (req: CustomNextApiRequest, res: NextApiResponse) => {
    const authorizationToken = req.headers.authorization;
    if (!authorizationToken) {
      return res.status(401).json({ message: "UnAuthorized access" });
    }

    const token = authorizationToken.split(" ")[1];

    jwt.verify(
      token,
      process.env.NEXT_PUBLIC_SECRET_JWT_TOKEN as string,
      (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Forbidden access" });
        }
        req.decoded = decoded;
        handler(req, res); // Call the handler to continue processing
      }
    );
  };
export default verifyAccess;
