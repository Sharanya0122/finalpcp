import User from '../models/User.js';
import FeatureRequest from '../models/FeatureRequest.js';

export const getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalRequests = await FeatureRequest.countDocuments();
        
        const requestsByStatus = await FeatureRequest.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const requestsByCategory = await FeatureRequest.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);

        res.json({
            totalUsers,
            totalRequests,
            requestsByStatus,
            requestsByCategory
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
