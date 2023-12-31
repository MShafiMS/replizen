import { UserService } from "@/modules/user/user.service";
import dbConnect from "@/utils/dbConnect";
import verifyAccess from "@/utils/verifyAccess";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  } else if (req.method === "GET") {
    try {
      const users = await UserService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default verifyAccess(handler);
