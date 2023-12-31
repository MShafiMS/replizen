import { UserService } from "@/modules/user/user.service";
import dbConnect from "@/utils/dbConnect";
import verifyAccess from "@/utils/verifyAccess";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  if (req.method === "GET") {
    const { email, phone } = req.query;
    try {
      if (email || phone) {
        if (email) {
          const loggedUser = await UserService.getUserByEmail(email as string);
          res.status(200).json(loggedUser);
        } else {
          const loggedUser = await UserService.getUserByPhone(phone as string);
          res.status(200).json(loggedUser);
        }
      } else {
        res
          .status(400)
          .json({ message: "Missing email or phone in request body" });
      }
    } catch (error) {
      res.status(404).json({ message: "User not found", error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default verifyAccess(handler);
