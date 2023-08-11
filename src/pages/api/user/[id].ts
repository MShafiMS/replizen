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
  } else if (req.method === "PUT") {
    const userId = req.query.id as string;
    const userData = req.body;
    try {
      const updateduser = await UserService.updateUser(userId, userData);
      res
        .status(200)
        .json({ message: "User updated successfully", user: updateduser });
    } catch (error) {
      res.status(404).json({ error: "User not found" });
    }
  } else if (req.method === "DELETE") {
    const userId = req.query.id as string;
    try {
      const deleted = await UserService.deleteUser(userId);
      res.status(200).json({
        message: `${
          deleted?.name || deleted?.email || deleted?.phone || "user"
        } deleted successfully`,
      });
    } catch (error) {
      res.status(404).json({ error: "Failed to delete user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
