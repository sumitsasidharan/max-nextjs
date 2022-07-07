import { MongoClient } from "mongodb";

async function handler(req, res) {
   if (req.method === 'POST') {
      const { email, name, message } = req.body;

      if (
         !email ||
         !email.includes('@') ||
         !name ||
         !name.trim() === '' ||
         !message ||
         message.trim() === ''
      ) {
         res.status(422).json({ message: 'Invalid Input' });
         return;
      }

      // store it in database
      const newMessage = { email, name, message }
      
      let client;
      try {
         client = await MongoClient.connect(process.env.MONGO_URL);
      } catch (error) {
         res.status(500).json({ message: 'could not connect to database'})
         return;
      }

      // a new database name can be given by client.db('dbname')
      const db = client.db();

      try {
         // naming collection name below
         const result = await db.collection('messages').insertOne(newMessage);
         newMessage.id = result.insertedId;
      } catch (error) {
         client.close();
         res.status(500).json({ message: 'Storing message failed!'})
         return;
      }

      client.close();

      res.status(201).json({ status: 'Successfully stored message!', message: newMessage});
   }
}

export default handler;