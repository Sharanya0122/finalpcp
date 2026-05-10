import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatar: {
        type: String,
        default: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAibiQjQiLAmNVI8Hx0IGoxYhicCG6lTjE52iGfCj6V_4wM1Aig140o521l22_U-u1b5t12RCHv_s9B3O0pPZqY.png'
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
