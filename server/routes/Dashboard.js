import express from 'express';
import { populateDashboard } from '../controllers/Dashboard.js';

import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const router = express.Router();

router.post('/populatedashboard',isLoggedIn,populateDashboard);

export default router;