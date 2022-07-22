import express from 'express';
import { populateDashboard ,getDataFromSpreadsheetById} from '../controllers/Dashboard.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const router = express.Router();

router.post('/populatedashboard',isLoggedIn,populateDashboard);
router.post('/getDataFromSpreadsheetById',getDataFromSpreadsheetById)

export default router;