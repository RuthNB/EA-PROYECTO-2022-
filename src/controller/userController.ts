import User from '../model/User';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { Request, Response } from 'express';
import Rating from '../model/Rating';

const register = async (req: Request, res: Response) => {
	const name = req.body.name;
	const email = req.body.email;
	let password = req.body.password;
	password = CryptoJS.AES.encrypt(password, 'secret key 123').toString();
	const newUser = new User({ name, email, password });
	await newUser.save();
	const token = jwt.sign({ id: newUser._id }, 'yyt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
		expiresIn: 60 * 60 * 24
	});
	res.status(200).json({ auth: true, token });
};

const login = async (req: Request, res : Response) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return res.status(404).send('The email does not exist');
	}
	const validPassword = CryptoJS.AES.decrypt(user.password!, 'secret key 123').toString(CryptoJS.enc.Utf8);
	if (!validPassword) {
		return res.status(401).json({ auth: false, token: null });
	}
	const token = jwt.sign({ id: user._id }, 'yyt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
		expiresIn: 60 * 60 * 24
	});
	res.json({ auth: true, token });
};
const newRating = async (req: Request, res: Response) => {
	const author = req.body.author;
	const comment = req.body.comment;
	const dest = req.body.dest;
	const rate = req.body.rate;
	const user_a = await User.findOne({name:author});
	const user_d = await User.findOne({name:dest});
	if (!user_a||!user_d) {
		return res.status(400).json({ message: 'User not found' });
	}
	
	const newRating = new Rating({ author:user_a.id, comment, dest:user_d.id, rate});
	await newRating.save();

	res.status(200);
};

const profile = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.userId, { password: 0 });
	if (!user) {
		return res.status(404).send('No user found.');
	}
	res.json(user);
};

const getall = async (req: Request, res: Response) => {
	const users = await User.find();
	res.json(users);
};

const getone = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);
	res.json(user);
};
const getRatings = async (req: Request, res: Response) => {
	const ratings = await Rating.find({dest:req.params.id}).populate('user');
	res.json(ratings);
};

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


// const {id,user,name,completed} = req.body;
export default {
	register,
	login,
	newRating,
	profile,
	getall,
	getRatings,
	getone,
	changePass
};