import Participant from '../model/Participant';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../model/User';

// CREATE PARTICIPANT

const createParticipant = async (req: Request, res: Response) => {
	const user = req.body.user;
	const name = req.body.name;
	const user1 = await User.findOne({ name: user });
	if (!user1) {
		return res.status(400).json({ message: 'User not found' });
	}
	const newParticipant = new Participant({
		name,
		user: user1._id
	});
	await newParticipant.save();
	res.status(200).json({ auth: true });
};
// GET A PARTICIPANT BY ID

const getParticipant = async (req: Request, res: Response) => {
	const participant = await Participant.findById(req.params.id);
	res.json(participant);
};

// DELETE PARTICIPANT

const deleteParticipant = async (req: Request, res: Response) => {
	const name = req.body.name;
	const userID = req.body.user;
	const findparticipant = await Participant.findOne({ name, user: userID });
	if (!findparticipant) {
		return res.status(400).json({ message: 'Participant not found' });
	}
	await Participant.findByIdAndDelete(findparticipant._id);
	res.status(200).json({ auth: true });
};
export default {
	createParticipant,
	getParticipant,
	deleteParticipant
};