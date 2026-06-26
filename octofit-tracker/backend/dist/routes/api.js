"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_js_1 = require("../models/Activity.js");
const Team_js_1 = require("../models/Team.js");
const User_js_1 = require("../models/User.js");
const Workout_js_1 = require("../models/Workout.js");
const router = (0, express_1.Router)();
router.get('/users', async (_req, res) => {
    const users = await User_js_1.User.find({}, '-passwordHash');
    res.json(users);
});
router.post('/users', async (req, res) => {
    const user = await User_js_1.User.create(req.body);
    res.status(201).json(user);
});
router.get('/teams', async (_req, res) => {
    const teams = await Team_js_1.Team.find().populate('members', '-passwordHash');
    res.json(teams);
});
router.post('/teams', async (req, res) => {
    const team = await Team_js_1.Team.create(req.body);
    res.status(201).json(team);
});
router.get('/activities', async (_req, res) => {
    const activities = await Activity_js_1.Activity.find().populate('user', '-passwordHash');
    res.json(activities);
});
router.post('/activities', async (req, res) => {
    const activity = await Activity_js_1.Activity.create(req.body);
    res.status(201).json(activity);
});
router.get('/workouts', async (_req, res) => {
    const workouts = await Workout_js_1.Workout.find();
    res.json(workouts);
});
router.post('/workouts', async (req, res) => {
    const workout = await Workout_js_1.Workout.create(req.body);
    res.status(201).json(workout);
});
exports.default = router;
