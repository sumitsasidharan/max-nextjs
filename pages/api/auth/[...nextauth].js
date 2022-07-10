import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
   session: {
      jwt: true
   },
   providers: [
      CredentialsProvider({
         async authorize(credentials, req) {
            const client = await connectToDatabase();

            const usersCollection = client.db().collection('users');

            // check for existing user
            const user = await usersCollection.findOne({ email: credentials.email });

            // authorize function will route to a different page we throw an error
            if (!user) {
               throw new Error('No user found!');
            }

            const isValid = await verifyPassword(credentials.password, user.password);

            if (!isValid) {
               client.close();
               throw new Error('Incorrect username or password!');
            }

            client.close();

            // if we return an object inside authorize, next-auth will know that authorization succeeded.
            return { email: user.email};
         },
      }),
   ],
});