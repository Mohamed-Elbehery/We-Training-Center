import User from "@/models/user";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/lib/database";

export const authOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_APP_CLIENT_ID,
      clientSecret: process.env.GOOGLE_APP_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session?.user?.email });

      if(sessionUser) {
        session.user.id = await sessionUser._id.toString();
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        // serverless => labda => dynamodb
        await connectToDB();
        // check if a user already exist
        const userExists = await User.findOne({
          email: profile?.email,
        });

        // if not create a new user and save it in the database
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name,
            image: profile?.picture,
          });
        }

        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  },
};
