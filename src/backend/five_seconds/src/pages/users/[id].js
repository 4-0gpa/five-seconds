// src/pages/api/users/[id].js
import clientPromise from '../../../lib/mongodb';

export async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection('users');
  const { id } = req.query;

  if (req.method === 'GET') {
    // Get user by ID
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } else if (req.method === 'PUT') {
    // Update user
    const { name, email } = req.body;
    const updatedUser = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, email } }
    );
    res.status(200).json(updatedUser);
  } else if (req.method === 'DELETE') {
    // Delete user
    const deletedUser = await usersCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: 'User deleted', deletedUser });
  }
}
