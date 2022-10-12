import Route from '../model/Route';
import StopPoint from '../model/StopPoint';
import Participant from '../model/Participant';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

// CREATE NEW ROUTE
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

// PUT NEW STOP POINT INTO A ROUTE

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

// PUT NEW PARTICIPANT INTO A ROUTE

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

// GET ALL ROUTES

const getAllRoutes = async (req: Request, res: Response) => {
	const routes = await Route.find().populate('user');
	res.json(routes);
};

// GET ALL PARTICIPANTS

const getAllParticipants = async (req: Request, res: Response) => {
	const participants = await Route.find().populate('route');
	res.json(participants);
};

// GET A ROUTE BY ID

const getRoute = async (req: Request, res: Response) => {
	const route = await Route.findById(req.params.id).populate('user');
	res.json(route);
};


// UPDATE 

const changePass = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return res.status(404).send('No user found.');
	}
	if(req.body.password === CryptoJS.AES.decrypt(user.password!, 'secret key 123').toString(CryptoJS.enc.Utf8)){
		let newpassword = req.body.newpassword;
		newpassword = CryptoJS.AES.encrypt(newpassword, 'secret key 123').toString();
		user.password = newpassword;
		await user.save();
		res.json({ status: 'User Updated' });
	}
	else{
		res.json({ status: 'Wrong password' });
	}
};

 //Falta acabar
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

// DELETE ROUTE

const deleteRoute = async (req: Request, res: Response) => {
	const route = req.body.route;
	const findRoute = await Route.findOne(route);
	if (!findRoute) {
		return res.status(400).json({ message: 'Route not found.' });
	}
	await Route.findByIdAndDelete(findRoute._id);
	res.status(200).json({ auth: true });
};

export default{
	create,
	newStopPoint,
	deleteRoute
};