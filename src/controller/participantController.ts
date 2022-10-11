import Participant from 'src/model/Participant';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const create = async (req: Request, res: Response) => {
	const name = req.body.name;
	const user = req.body.user;
	const newParticipant = new Participant({ name, user });
	await newParticipant.save();
	const token = jwt.sign({ id: newParticipant._id }, 'syt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
		expiresIn: 60 * 60 * 24
	});
	res.status(200).json({ auth: true, token });
};

const remove = async (req: Request, res: Response) => {
	const name = req.body.name;
	const userID = req.body.stopPointID;
	const findParticipant= await Participant.findOne({ name, User: userID });
	if (!findParticipant) {
		return res.status(400).json({ message: 'Participant not found' });
	}
	await Participant.findByIdAndDelete(findParticipant._id);
	res.status(200).json({ auth: true });
};