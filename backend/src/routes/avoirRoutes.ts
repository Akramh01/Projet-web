import { Router } from 'express';
import { getCompetencesWithIdEmployes, getEmployesWithIdCompetences, linkEmployeCompetences} from '../controllers/avoirController';

const router = Router();

router.get('/competences', getCompetencesWithIdEmployes);
router.get('/employes', getEmployesWithIdCompetences);
router.post('/link', linkEmployeCompetences);

export default router;