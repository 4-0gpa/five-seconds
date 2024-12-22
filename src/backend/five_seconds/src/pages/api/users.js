// src/pages/api/users.js
import clientPromise from '../../lib/mongodb';

export async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection('users');

  if (req.method === 'GET') {
    // Get all users
    const users = await usersCollection.find().toArray();
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    // Create a new user
    const { name, email } = req.body;
    const newUser = await usersCollection.insertOne({ name, email });
    res.status(201).json(newUser.ops[0]);
  }
}
