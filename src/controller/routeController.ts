import Route from 'src/model/Route';
import StopPoint from 'src/model/StopPoint';
import Participants from 'src/model/Participants';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const create = async (req: Request, res: Response) => {
	const startPoint = req.body.startPoint;
	const endPoint = req.body.endPoint;
	const stopPoint = req.body.stopPoint;
	const creator = req.body.creator;
	const participants = req.body.participants;
	const newRoute = new Route({ startPoint, endPoint, stopPoint,creator,participants });
	await newRoute.save();
	const token = jwt.sign({ id: newRoute._id }, 'yyt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
		expiresIn: 60 * 60 * 24
	});
	res.status(200).json({ auth: true, token });
};

const newStopPoint = async (req: Request, res: Response) => {
	const route = await Route.findById(req.params.id);
	if (!route) {
		return res.status(404).send('No route found.');
	}
	else{
		const newEndPoint = req.body.newEndPoint;
		route.endPoint = route.endPoint + newEndPoint;
		await route.save();
		res.json({ status: 'Stop Point Added.' });
	}
};

const newParticipant = async (req: Request, res: Response) => {
	const route = await Route.findById(req.params.id);
	if (!route) {
		return res.status(404).send('No route found.');
	}
	else{
		const newParticipant = req.body.newParticipant;
		route.participants = route.participants + newParticipant;
		await route.save();
		res.json({ status: 'New Participant Added.' });
	}
};

const deleteStopPoint = async (req: Request, res: Response) => {
	const route = await Route.findById(req.params.id);
	if (!route) {
		return res.status(404).send('No route found.');
	}
	if(route.endPoint.findByIdAndDelete(req.params.id);)
	else{
		const newEndPoint = req.body.newEndPoint;
		route.endPoint = route.endPoint + newEndPoint;
		await route.save();
		res.json({ status: 'Stop Point Added.' });
	}
};

//Falta saber si es borra dels usuaris o com va
const realize = async (req: Request, res: Response) => {
	const route = req.body.route;
	const userID = req.body.user;
	const findroute = await Route.findOne({ route, user: userID });
	if (!findroute) {
		return res.status(400).json({ message: 'Route not found' });
	}
	await Route.findByIdAndDelete(findroute._id);
	res.status(200).json({ auth: true });
};
export default{
	create,
	newStopPoint,
	realize
};