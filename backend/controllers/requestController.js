import FeatureRequest from '../models/FeatureRequest.js';

export const getRequests = async (req, res) => {
    try {
        const requests = await FeatureRequest.find().populate('submittedBy', 'name avatar').sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createRequest = async (req, res) => {
    try {
        const { title, category, description, priority, platform, screenshots } = req.body;

        const request = await FeatureRequest.create({
            title,
            category,
            description,
            priority,
            platform,
            screenshots,
            submittedBy: req.user._id
        });

        const populatedRequest = await FeatureRequest.findById(request._id).populate('submittedBy', 'name avatar');
        res.status(201).json(populatedRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRequestById = async (req, res) => {
    try {
        const request = await FeatureRequest.findById(req.params.id).populate('submittedBy', 'name avatar');
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRequest = async (req, res) => {
    try {
        const request = await FeatureRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Only allow user who submitted it to update (if not admin)
        if (request.submittedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to update this request' });
        }

        const updatedRequest = await FeatureRequest.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('submittedBy', 'name avatar');
        res.json(updatedRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRequest = async (req, res) => {
    try {
        const request = await FeatureRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        if (request.submittedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to delete this request' });
        }

        await FeatureRequest.findByIdAndDelete(req.params.id);
        res.json({ message: 'Request removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRequestStatus = async (req, res) => {
    try {
        const { status, adminFeedback } = req.body;
        const request = await FeatureRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        request.status = status || request.status;
        if (adminFeedback !== undefined) {
            request.adminFeedback = adminFeedback;
        }

        const updatedRequest = await request.save();
        const populatedRequest = await FeatureRequest.findById(updatedRequest._id).populate('submittedBy', 'name avatar');
        res.json(populatedRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const toggleVote = async (req, res) => {
    try {
        const request = await FeatureRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        const userId = req.user._id;
        const index = request.votes.indexOf(userId);

        if (index === -1) {
            request.votes.push(userId);
        } else {
            request.votes.splice(index, 1);
        }

        await request.save();
        res.json({ votes: request.votes.length, hasVoted: index === -1 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
