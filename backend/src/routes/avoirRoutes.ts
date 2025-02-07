import { Router } from 'express';
import { getCompetencesWithNameEmployes, getEmployesWithNameCompetences, linkEmployeCompetences} from '../controllers/avoirController';

const router = Router();

router.get('/competences', getCompetencesWithNameEmployes);
router.get('/employes', getEmployesWithNameCompetences);
router.post('/link', linkEmployeCompetences);

export default router;