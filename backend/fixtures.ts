import mongoose from 'mongoose';
import config from './config';
import User from './models/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('photos');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const [user1, user2] = await User.create(
    {
      username: 'user@shop.local',
      password: '1qaz@WSX',
      role: 'user',
      displayName: 'user',
      token: crypto.randomUUID(),
    },
    {
      username: 'admin@shop.local',
      password: '1@345qWert',
      role: 'admin',
      displayName: 'admin',
      token: crypto.randomUUID(),
    },
  );

  await db.close();
};

run().catch(console.error);
