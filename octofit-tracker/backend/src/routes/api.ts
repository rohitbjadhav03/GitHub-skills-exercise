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

export default router;
