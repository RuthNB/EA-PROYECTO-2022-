import express from "express";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import User from "./api/User";

const app = express();
const port = process.env.PORT || 5432;

// Middlewares
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json())
app.use(cors());

// Routes
app.use('/api/users', User)


// Idle
app.get('/', ( req: express.Request, res: express.Response ) => {
	res.send('Hello World!')
})

// Database
mongoose.connect('mongodb://localhost/users', { useNewUrlParser : true } as ConnectOptions)
	.then(() => {
		// tslint:disable-next-line:no-console
        app.listen(port, () => console.log("Server corriendo en el puerto " + port));
	})
	.catch((err) => {
		// tslint:disable-next-line:no-console
		console.log(err);
	});
