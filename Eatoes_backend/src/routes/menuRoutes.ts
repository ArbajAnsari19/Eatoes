import { Router } from 'express';
import MenuController from '../controllers/menuController';

const router = Router();

router.get('/', MenuController.getMenuItems);

export default router;