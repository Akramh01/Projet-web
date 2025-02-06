import { Router } from 'express';
import {
    getEmployes,
    addEmployes,
    getEmployeWithId,
    getEmployeWithName,
    deleteEmploye
} from '../controllers/employesController';

const router = Router();

router.get('/', getEmployes);
router.get('/:idE', getEmployeWithId);
router.get('/name/:nom/:prenom', getEmployeWithName);
router.post('/', addEmployes);
router.delete('/:idE', deleteEmploye);

export default router;