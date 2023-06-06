import { Schema, model } from 'mongoose';

const schema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 150 },
  price: { type: Number, required: true, max: 100 },
  thumbnail: { type: String, required: false, max: 100 },
  code: { type: String, required: true, max: 10, unique: true },
  stock: { type: Number, required: true, max: 10 },
  category: { type: String, required: true, max: 100 },
  status: { type: Boolean, required: true, max: 5 },
});

export const ProductModel = model('products', schema);
