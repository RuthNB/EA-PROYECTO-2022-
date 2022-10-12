import { Router } from 'express';
import Route from '../model/Route';

const router = Router();
router.post('/create', routeController.create);

export default router;