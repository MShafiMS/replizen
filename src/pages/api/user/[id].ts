import { UserService } from "@/modules/user/user.service";
import dbConnect from "@/utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "GET") {
    const userId = req.query.id as string;
    try {
      const user = await UserService.getUser(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: "User not found" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
