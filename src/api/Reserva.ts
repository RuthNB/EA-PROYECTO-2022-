import bookingController from '../controller/reservaController';
import { Router } from 'express';

const router = Router();

router.post('/booking', bookingController.booking);
router.delete('/cancel', bookingController.cancel);
router.get('/', bookingController.getall);

export default router;