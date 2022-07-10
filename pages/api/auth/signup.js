import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
   if (req.method === 'POST') {
      const data = req.body;
console.log(req.body)
      const { email, password } = data;

      // check if email or password is invalid
      if (
         !email ||
         !email.includes('@') ||
         !password ||
         password.trim().length < 7
      ) {
         res.status(422).json({
            status: 'failed',
            message: 'Invalid input - password should atleast be 7 characters',
         });
         return;
      }

      const client = await connectToDatabase();

      const db = client.db();

      // checking if user email already exists
      const existingUser = await db.collection('users').findOne({ email:email });

      if (existingUser) {
         res.status(422).json({ status: 'failed', message: 'User already exists!'});
         client.close();
         return;
      }

      const hashedPassword = await hashPassword(password);

      const result = await db.collection('users').insertOne({
         email: email,
         password: hashedPassword,
      });

      res.status(201).json({
         status: 'success',
         message: 'Created new user successfully!',
      });
      client.close();
   }
   
}

export default handler;
