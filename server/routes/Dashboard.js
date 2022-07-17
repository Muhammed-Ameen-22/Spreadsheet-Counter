import express from 'express';
import {subscribe,fetchSignedInEmails} from '../controllers/Subscription.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const router = express.Router();

router.post('/subscribe', isLoggedIn,subscribe);
router.get('/fetchSignedInEmails',isLoggedIn,fetchSignedInEmails)
// router.post('/readDrive',readDrive);
export default router;