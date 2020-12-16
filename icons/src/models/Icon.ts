import mongoose, { Schema, Document } from 'mongoose';

export interface Icon extends Document {
  icon: string;
  path: string;
}

const IconSchema: Schema = new Schema({
  icon: {
    type: String,
    required: [true, 'Icon are required'],
    unique: true,
    index: true,
  },
  path: {
    type: String,
    required: [true, 'Path are required'],
  },
});

export default mongoose.model<Icon>('Icon', IconSchema);
