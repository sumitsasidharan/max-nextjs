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

      // use the following connection string if env variables stored in next.config.js
      // let connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.qcd6a5x.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

      let connectionString = process.env.MONGO_URL;

      try {
         client = await MongoClient.connect(connectionString);
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