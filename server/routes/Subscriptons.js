import express from 'express';
import {fetchSignedInEmails, authenticateToken} from '../controllers/Subscription.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const router = express.Router();

router.get('/fetchSignedInEmails',isLoggedIn,fetchSignedInEmails)
router.get('/authenticate',isLoggedIn,authenticateToken);


export default router;