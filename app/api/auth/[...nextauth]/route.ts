import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
// import Email from "next-auth/providers/email";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Twitter from "next-auth/providers/twitter";

export const authOptions: NextAuthOptions = {
  providers: [
    // Email({
    //     server: {
    //         host: process.env.EMAIL_SERVER_HOST ?? "",
    //         port: Number(process.env.EMAIL_SERVER_PORT ?? ""),
    //         auth: {
    //             user: process.env.EMAIL_SERVER_USER ?? "",
    //             pass: process.env.EMAIL_SERVER_PASSWORD ?? "",
    //         },
    //     },
    //     from: process.env.EMAIL_FROM ?? "",
    // }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    }),
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID ?? "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET ?? "",
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
