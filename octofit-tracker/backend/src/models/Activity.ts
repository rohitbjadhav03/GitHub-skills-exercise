import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, trim: true },
  durationMinutes: { type: Number, required: true, min: 0 },
  caloriesBurned: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const Activity: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema);
