import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  vehicleModel: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

const Driver = mongoose.model('Driver', driverSchema);

export default Driver;
