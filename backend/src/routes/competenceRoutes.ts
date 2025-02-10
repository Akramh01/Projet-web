import { Router } from 'express';
import { getCompetences, getCompetenceWithId, getCompetenceWithNameFr, getCompetenceWithNameEn} from '../controllers/competenceController';

const router = Router();

router.get('/', getCompetences);
router.get('/id', getCompetenceWithId);
router.get('/nom-fr', getCompetenceWithNameFr);
router.get('/nom-en', getCompetenceWithNameEn);

export default router;