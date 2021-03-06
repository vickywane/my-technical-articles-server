import { Schema, model } from "mongoose";

const WineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: String,
  image_uri: { type: String, required: true },
});

export default model("Wine", WineSchema);
