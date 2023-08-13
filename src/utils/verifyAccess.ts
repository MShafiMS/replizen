// import jwt from "jsonwebtoken";
// import { NextApiRequest, NextApiResponse } from "next";

// const verifyAccess =
//   (handler: (req: NextApiRequest, res: NextApiResponse) => void) =>
//   (req: NextApiRequest, res: NextApiResponse) => {
//     const authorizationToken = req.headers.authorization;
//     if (!authorizationToken) {
//       return res.status(401).json({ message: "UnAuthorized access" });
//     }

//     const token = authorizationToken.split(" ")[1];

//     jwt.verify(
//       token,
//       process.env.SECRET_JWT_TOKEN as string,
//       (err, decoded) => {
//         if (err) {
//           return res.status(403).json({ message: "Forbidden access" });
//         }
//         req.decoded = decoded;
//         handler(req, res);
//       }
//     );
//   };

// export default verifyAccess;
