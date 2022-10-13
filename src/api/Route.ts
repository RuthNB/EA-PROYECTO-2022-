import { Router } from 'express';
import Route from '../model/Route';
import routeController from '../controller/routeController';

const router = Router();
router.post('/create', routeController.create);
router.post('/newStopPoint', routeController.newStopPoint);
router.post('/newParticipant', routeController.newParticipant);
router.get('/getAllParticipants',routeController.getAllParticipants);
router.get('/getAllRoutes',routeController.getAllRoutes);
router.get('/getAllPoints',routeController.getAllPoints);
router.put('/gupdateRoute',routeController.updateRoute);
router.delete('/deleteRoute',routeController.deleteRoute);

export default router;
