import  express  from "express";
import { User } from "../models/user.js";
import { register,login, myProfile , logout} from "../controllers/user.js";
import { isAuthenticated } from "../middlewere/auth.js";

const router = express.Router();

router.post('/register',register);

router.post('/login',login);

router.get('/logout',logout);

router.get('/me',myProfile);

export default router;