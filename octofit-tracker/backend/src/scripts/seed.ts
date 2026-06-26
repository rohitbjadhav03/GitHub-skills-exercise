import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const users = await User.create([
    {
      username: 'alex',
      email: 'alex@example.com',
      passwordHash: 'hash-1',
      profile: { displayName: 'Alex Rivera', fitnessLevel: 'intermediate' }
    },
    {
      username: 'maya',
      email: 'maya@example.com',
      passwordHash: 'hash-2',
      profile: { displayName: 'Maya Chen', fitnessLevel: 'advanced' }
    },
    {
      username: 'sam',
      email: 'sam@example.com',
      passwordHash: 'hash-3',
      profile: { displayName: 'Sam Patel', fitnessLevel: 'beginner' }
    }
  ]);

  const teams = await Team.create([
    {
      name: 'Peak Performers',
      description: 'A high-energy team focused on strength and endurance.',
      members: [users[0]._id, users[1]._id]
    },
    {
      name: 'Morning Movers',
      description: 'A friendly group that loves early workouts and consistency.',
      members: [users[2]._id]
    }
  ]);

  await Activity.create([
    {
      user: users[0]._id,
      type: 'run',
      durationMinutes: 30,
      caloriesBurned: 320,
      date: new Date('2026-06-20')
    },
    {
      user: users[1]._id,
      type: 'strength',
      durationMinutes: 45,
      caloriesBurned: 410,
      date: new Date('2026-06-21')
    },
    {
      user: users[2]._id,
      type: 'yoga',
      durationMinutes: 25,
      caloriesBurned: 180,
      date: new Date('2026-06-22')
    }
  ]);

  await Workout.create([
    {
      title: 'HIIT Sprint Circuit',
      description: 'Short bursts of speed and recovery for full-body conditioning.',
      difficulty: 'advanced',
      durationMinutes: 25
    },
    {
      title: 'Core Stability Flow',
      description: 'A balanced workout for posture, balance, and core strength.',
      difficulty: 'intermediate',
      durationMinutes: 20
    },
    {
      title: 'Beginner Mobility Session',
      description: 'Gentle mobility and breathing exercises for a fresh start.',
      difficulty: 'beginner',
      durationMinutes: 15
    }
  ]);

  console.log(`Seeded ${users.length} users, ${teams.length} teams, activities, and workouts.`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
