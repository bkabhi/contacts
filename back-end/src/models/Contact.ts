import mongoose, { Document, Schema } from "mongoose";

// Define the interface for a Contact document
export interface IContact extends Document {
  firstName: string;
  lastName?: string;
  mobileNo?: string;
  status: string;
}

// Define the schema for the Contact model
const contactSchema: Schema<IContact> = new Schema({
  firstName: {
    type: String,
    required: true, // First name is required
  },
  lastName: {
    type: String,
  },
  mobileNo: {
    type: String,
  },
  status: {
    type: String,
    required: true, // Status is required
    enum: ["active", "inactive"], // Status must be one of these values
    default: "active", // Default status is 'active'
  },
}, {
  versionKey: false,
  timestamps: true,
});

// Create and export the Contact model based on the schema
export default mongoose.model<IContact>("Contact", contactSchema);
