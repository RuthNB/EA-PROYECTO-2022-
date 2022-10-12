import participantController from '../controller/participantController';
import { Router } from 'express';

const router = Router();

router.post('/create', participantController.createParticipant);
router.delete('/delete', participantController.deleteParticipant);
router.get('/get', participantController.getParticipant);

export default router;