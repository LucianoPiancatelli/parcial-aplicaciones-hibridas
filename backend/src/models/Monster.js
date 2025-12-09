import mongoose from 'mongoose';

const MonsterSchema = new mongoose.Schema(
  {
    index: { type: String, unique: true, index: true },
    name: { type: String, required: true, index: true },
    size: String,
    type: String,
    alignment: String,
    armor_class: Number,
    hit_points: Number,
    challenge_rating: Number,
    languages: String,
    senses: String,
    source_url: String
  },
  { timestamps: true }
);

MonsterSchema.index({ name: 'text' });

export default mongoose.model('Monster', MonsterSchema);
