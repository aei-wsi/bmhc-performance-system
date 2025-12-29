import express from 'express';
import {
  getAllContractors,
  getContractorById,
  createContractor,
  updateContractor,
  deleteContractor
} from '../controllers/contractorController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all contractors
router.get('/', getAllContractors);

// Get contractor by ID
router.get('/:id', getContractorById);

// Create contractor (admin/supervisor only)
router.post('/', authorize('admin', 'supervisor'), createContractor);

// Update contractor (admin/supervisor only)
router.put('/:id', authorize('admin', 'supervisor'), updateContractor);

// Delete contractor (admin only)
router.delete('/:id', authorize('admin'), deleteContractor);

export default router;
