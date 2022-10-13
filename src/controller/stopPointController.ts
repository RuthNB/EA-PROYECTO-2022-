/* import StopPoint from '../model/StopPoint';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

// CREATE STOP POINT
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
// UPDATE STOP POINT

const stopPoint = await StopPoint.findById(req.params.id);
if (!stopPoint) {
	return res.status(404).send('No stop point found.');
}
if(req.body.password === CryptoJS.AES.decrypt(user.password!, 'secret key 123').toString(CryptoJS.enc.Utf8)){
	let newpassword = req.body.newpassword;
	newpassword = CryptoJS.AES.encrypt(newpassword, 'secret key 123').toString();
	user.password = newpassword;
	await user.save();
	res.json({ status: 'User Updated' });
}
else{
	const newStopPoint = req.body.newStopPoint;
	StopPoint.

	res.json({ status: 'Wrong password' });
}
};

// DELETE STOP POINT

const deleteStopPoint = async (req: Request, res: Response) => {
	const name = req.body.name;
	const findStopPoint= await StopPoint.findOne(name);
	if (!findStopPoint) {
		return res.status(400).json({ message: 'Stop Point not found' });
	}
	await StopPoint.findByIdAndDelete(findStopPoint._id);
	res.status(200).json({ auth: true });
};
 */