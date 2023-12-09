import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (_: any, res: NextResponse) => {
  try {
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ message: "Couldn't Fetch Users" });
  }
};
