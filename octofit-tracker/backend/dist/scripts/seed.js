"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_js_1 = require("../config/database.js");
const Activity_js_1 = require("../models/Activity.js");
const Team_js_1 = require("../models/Team.js");
const User_js_1 = require("../models/User.js");
const Workout_js_1 = require("../models/Workout.js");
async function seed() {
    await (0, database_js_1.connectToDatabase)();
    console.log('Seed the octofit_db database with test data');
    console.log('Connected to MongoDB for seeding');
    await Promise.all([
        User_js_1.User.deleteMany({}),
        Team_js_1.Team.deleteMany({}),
        Activity_js_1.Activity.deleteMany({}),
        Workout_js_1.Workout.deleteMany({})
    ]);
    const users = await User_js_1.User.create([
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
    const teams = await Team_js_1.Team.create([
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
    await Activity_js_1.Activity.create([
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
    await Workout_js_1.Workout.create([
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
    await mongoose_1.default.disconnect();
}
seed().catch((error) => {
    console.error('Seeding failed', error);
    process.exit(1);
});
