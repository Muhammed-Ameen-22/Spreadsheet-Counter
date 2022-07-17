import express from 'express';
import {subscribe,fetchSignedInEmails} from '../controllers/Dashboard.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const router = express.Router();

router.post('/subscribe', isLoggedIn,subscribe);
router.post('/fetchSignedInEmails',isLoggedIn,fetchSignedInEmails)
export default router;