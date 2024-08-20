import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  s3Key: { type: String, required: true }, // Path to the file
  bucket: { type: String, required: true }, // Storage location
  mime: { type: String, required: true }, // MIME type
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);

export default File;
