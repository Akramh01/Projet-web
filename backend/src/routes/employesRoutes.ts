import { Router } from 'express';
import {getEmployes, addEmployes, getEmployeWithId, getEmployeWithName} from '../controllers/employesController';

const router = Router();

//Ne pas s'inquieter pour les erreurs
router.get('/', getEmployes);
router.get('/id/:idE', getEmployeWithId);
router.get('/name/:nom/:prenom', getEmployeWithName);
router.post('/add/:nom/:prenom/:date_embauche/:poste', addEmployes);

export default router;