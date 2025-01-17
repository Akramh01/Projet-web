import { Router } from 'express';
import { getCompetences, addCompetences} from '../controllers/competenceController';

const router = Router();

router.get('/personnels', getCompetences);
router.post('/personnels', addCompetences);

export default router;