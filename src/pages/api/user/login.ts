import { UserService } from "@/modules/user/user.service";
import dbConnect from "@/utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "PUT") {
    const { email, phone } = req.body;
    try {
      if (email || phone) {
        if (email) {
          const loggedUser = await UserService.loginEmail(email as string);
          res.status(200).json(loggedUser);
        } else {
          const loggedUser = await UserService.loginPhone(phone as string);
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
  } else if (req.method === "GET") {
    const { email } = req.query;
    const user = await UserService.emailUser(email as string);
    res.status(200).json(user);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
