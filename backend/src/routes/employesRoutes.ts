import { Router } from 'express';
import {
    getEmployes,
    addEmployes,
    getEmployeWithId,
    getEmployeWithName,
    deleteEmploye
} from '../controllers/employesController';

const router = Router();

//Ne pas s'inquieter pour les erreurs
router.get('/', getEmployes);
router.get('/id/:idE', getEmployeWithId);
router.get('/name/:nom/:prenom', getEmployeWithName);
router.post('/add', addEmployes);
router.delete('/delete/:idE', deleteEmploye);


export default router;