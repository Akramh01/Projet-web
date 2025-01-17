import { Router } from 'express';
import { getPersonnels, addPersonnels} from '../controllers/personnelController';

const router = Router();

router.get('/personnels', getPersonnels);
router.post('/personnels', addPersonnels);

export default router;