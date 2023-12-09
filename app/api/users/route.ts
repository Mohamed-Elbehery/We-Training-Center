import User from "@/models/user";

export const GET = async () => {
  try {
    const users = await User.find({});
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    console.log(err);
  }
};
