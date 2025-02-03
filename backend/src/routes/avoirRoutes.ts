import { Router } from 'express';
import { getCompetencesWithNameEmployes, getEmployesWithNameCompetences, linkEmployeCompetences} from '../controllers/avoirController';

const router = Router();

router.get('/competences/:nom/:prenom', getCompetencesWithNameEmployes);
router.get('/employes/:nomCompetence', getEmployesWithNameCompetences);
router.post('/link', linkEmployeCompetences);

export default router;