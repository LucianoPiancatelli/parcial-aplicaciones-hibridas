import mongoose from 'mongoose';

const RaceSchema = new mongoose.Schema(
  {
    index: { type: String, unique: true, index: true },
    name: { type: String, required: true, index: true },
    speed: Number,
    size: String,
    alignment: String,
    age: String,
    language_desc: String,
    ability_bonuses: [
      {
        ability: String,
        bonus: Number
      }
    ],
    traits: [String],
    starting_proficiencies: [String],
    source_url: String
  },
  { timestamps: true }
);

RaceSchema.index({ name: 'text' });

export default mongoose.model('Race', RaceSchema);
