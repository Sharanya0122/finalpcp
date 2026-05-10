import mongoose from 'mongoose';

const featureRequestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    platform: {
        type: String,
        required: true
    },
    screenshots: [{
        type: String
    }],
    rating: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Pending', 'Under Review', 'In Progress', 'Completed', 'Rejected'],
        default: 'Pending'
    },
    adminFeedback: {
        type: String,
        default: ''
    },
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export default mongoose.model('FeatureRequest', featureRequestSchema);
