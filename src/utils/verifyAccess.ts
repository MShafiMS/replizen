import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

interface CustomNextApiRequest extends NextApiRequest {
  decoded?: any;
}

const verifyAccess =
  (
    handler: (req: CustomNextApiRequest, res: NextApiResponse) => Promise<void>
  ) =>
  async (req: CustomNextApiRequest, res: NextApiResponse) => {
    try {
      const authorizationToken = req.headers.authorization;
      if (!authorizationToken) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      const token = authorizationToken.split(" ")[1];

      jwt.verify(
        token,
        process.env.NEXT_PUBLIC_SECRET_JWT_TOKEN as string,
        (err, decoded) => {
          if (err) {
            return res.status(403).json({ message: "Forbidden access", err });
          }
          req.decoded = decoded;
          handler(req, res).catch((error) => {
            console.error("Error in handler:", error);
            res.status(500).json({ message: "Internal server error" });
          });
        }
      );
    } catch (error) {
      console.error("Error in middleware:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

export default verifyAccess;
