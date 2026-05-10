import express from 'express';
import { getRequests, createRequest, getRequestById, updateRequest, deleteRequest, updateRequestStatus, toggleVote } from '../controllers/requestController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

router.route('/')
    .get(getRequests)
    .post(protect, createRequest);

router.route('/:id')
    .get(getRequestById)
    .put(protect, updateRequest)
    .delete(protect, deleteRequest);

router.route('/:id/status').patch(protect, admin, updateRequestStatus);
router.route('/:id/vote').patch(protect, toggleVote);

export default router;
