import * as mongoose from "mongoose";

interface DocumentUser extends mongoose.Document {
  name: string;
  password: string;
  postalCode: string;
  city: string;
  address: string;
  telephone: string;
  email: string;
  role: string;
  createdAt: Date;
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  password: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  telephone: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: "user" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model<DocumentUser>("User", userSchema);

export { User };
