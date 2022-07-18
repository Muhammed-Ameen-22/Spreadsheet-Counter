import express from 'express';
import {fetchSignedInEmails, authenticateToken, getAccessToken} from '../controllers/Subscription.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const router = express.Router();

// router.post('/subscribe', isLoggedIn);
router.get('/fetchSignedInEmails',isLoggedIn,fetchSignedInEmails)
router.get('/authenticate',isLoggedIn,authenticateToken);
router.get('/getoAuthurl',getAccessToken);

export default router;