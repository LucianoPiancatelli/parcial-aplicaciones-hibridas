import mongoose from 'mongoose';

const EquipmentSchema = new mongoose.Schema(
  {
    index: { type: String, unique: true, index: true },
    name: { type: String, required: true, index: true },
    category: String,
    gear_category: String,
    cost: {
      quantity: Number,
      unit: String
    },
    weight: Number,
    desc: String,
    properties: [String],
    source_url: String
  },
  { timestamps: true }
);

EquipmentSchema.index({ name: 'text' });

export default mongoose.model('Equipment', EquipmentSchema);
