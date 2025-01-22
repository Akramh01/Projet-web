import { Router } from 'express';
import {getEmployes, addEmployes, getEmployeWithId, getEmployeWithName} from '../controllers/employesController';

const router = Router();

router.get('/', getEmployes);
router.get('/id/:idE', getEmployeWithId);
router.get('/name/:nom/:prenom', getEmployeWithName);
//router.post('/employes', addEmployes);

export default router;