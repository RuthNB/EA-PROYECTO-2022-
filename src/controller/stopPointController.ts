import StopPoint from 'src/model/StopPoint';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const create = async (req: Request, res: Response) => {
	const name = req.body.name;
	const stopPoint = req.body.stopPoint;
	const newStopPoint = new StopPoint({ name, stopPoint });
	await newStopPoint.save();
	const token = jwt.sign({ id: newStopPoint._id }, 'syt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
		expiresIn: 60 * 60 * 24
	});
	res.status(200).json({ auth: true, token });
};

const remove = async (req: Request, res: Response) => {
	const name = req.body.name;
	const stopPointID = req.body.stopPointID;
	const findStopPoint= await StopPoint.findOne({ name, StopPoint: stopPointID });
	if (!findStopPoint) {
		return res.status(400).json({ message: 'Stop Point not found' });
	}
	await StopPoint.findByIdAndDelete(findStopPoint._id);
	res.status(200).json({ auth: true });
};