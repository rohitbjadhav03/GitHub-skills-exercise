import { Router } from 'express';
import { Activity } from '../models/Activity.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const router = Router();

router.get('/users', async (_req, res) => {
  const users = await User.find({}, '-passwordHash');
  res.json(users);
});

router.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.get('/teams', async (_req, res) => {
  const teams = await Team.find().populate('members', '-passwordHash');
  res.json(teams);
});

router.post('/teams', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

router.get('/activities', async (_req, res) => {
  const activities = await Activity.find().populate('user', '-passwordHash');
  res.json(activities);
});

router.post('/activities', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

router.get('/workouts', async (_req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

router.post('/workouts', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

router.get('/leaderboard', async (_req, res) => {
  const leaderboard = await Activity.aggregate([
    {
      $group: {
        _id: '$user',
        totalCalories: { $sum: '$caloriesBurned' },
        totalDuration: { $sum: '$durationMinutes' },
        activities: { $sum: 1 }
      }
    },
    { $sort: { totalCalories: -1, totalDuration: -1 } },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' },
    {
      $project: {
        _id: 0,
        userId: '$_id',
        username: '$user.username',
        displayName: '$user.profile.displayName',
        totalCalories: 1,
        totalDuration: 1,
        activities: 1
      }
    }
  ]);

  res.json(leaderboard);
});

export default router;
