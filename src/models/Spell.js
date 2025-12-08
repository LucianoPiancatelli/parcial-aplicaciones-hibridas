import mongoose from 'mongoose';

const SpellSchema = new mongoose.Schema(
  {
    index: { type: String, unique: true, index: true },
    name: { type: String, required: true, index: true },
    level: Number,
    school: String,
    ritual: Boolean,
    concentration: Boolean,
    casting_time: String,
    range: String,
    duration: String,
    classes: [String],
    components: [String],
    desc: String,
    higher_level: String,
    source_url: String
  },
  { timestamps: true }
);

// Índices de texto útiles para búsquedas completas (opcional)
SpellSchema.index({ name: 'text' });

export default mongoose.model('Spell', SpellSchema);
