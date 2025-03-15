import { Router } from 'express';
import { getCompetencesWithIdEmployes, getEmployesWithIdCompetences, getRecommendations, linkEmployeCompetences} from '../controllers/avoirController';

const router = Router();

router.get('/competences', getCompetencesWithIdEmployes);
router.get('/employes', getEmployesWithIdCompetences);
router.post('/link', linkEmployeCompetences);
router.get('/recommendation', getRecommendations);

export default router;