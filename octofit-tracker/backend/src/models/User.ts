import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  profile: {
    displayName: string;
    fitnessLevel: string;
    avatarUrl?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  passwordHash: { type: String, required: true },
  profile: {
    displayName: { type: String, required: true, trim: true },
    fitnessLevel: { type: String, default: 'beginner' },
    avatarUrl: { type: String }
  }
}, {
  timestamps: true
});

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
