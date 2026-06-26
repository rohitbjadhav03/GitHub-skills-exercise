import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description?: string;
  difficulty: string;
  durationMinutes: number;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  difficulty: { type: String, default: 'beginner' },
  durationMinutes: { type: Number, required: true, min: 0 }
}, {
  timestamps: true
});

export const Workout: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);
