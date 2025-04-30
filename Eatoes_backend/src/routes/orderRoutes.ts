import { Router } from 'express';
import OrderController from '../controllers/orderController';
import { protect } from '../middleware/authMiddleware.ts';

const router = Router();

// POST /api/order
router.post('/', protect, OrderController.placeOrder);

// GET /api/order/:phoneNumber
router.get('/:phoneNumber', OrderController.getOrdersByPhoneNumber);

export default router;