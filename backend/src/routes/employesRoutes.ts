import { Router } from 'express';
import { getEmployes, addEmployes} from '../controllers/employesController';

const router = Router();

router.get('/employes', getEmployes);
router.post('/employes', addEmployes);

export default router;