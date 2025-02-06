import { Router } from 'express';
import { getCompetences, getCompetenceWithId, getCompetenceWithNameFr, getCompetenceWithNameEn} from '../controllers/competenceController';

const router = Router();

router.get('/', getCompetences);
router.get('/:idC', getCompetenceWithId);
router.get('/nom-fr/:nom_fr', getCompetenceWithNameFr);
router.get('/nom-en/:nom_en', getCompetenceWithNameEn);

export default router;