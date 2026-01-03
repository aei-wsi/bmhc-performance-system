import express from 'express';
import {
  getKPIsByContractor,
  createKPI,
  updateKPI,
  deleteKPI
} from '../controllers/kpiController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get KPIs for a contractor
router.get('/contractor/:contractorId', getKPIsByContractor);

// Create KPI (admin/supervisor only)
router.post('/', authorize('admin', 'supervisor'), createKPI);

// Update KPI
router.put('/:id', authorize('admin', 'supervisor'), updateKPI);

// Delete KPI (admin only)
router.delete('/:id', authorize('admin'), deleteKPI);

export default router;
