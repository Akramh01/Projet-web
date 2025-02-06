import { Router } from 'express';
import { getMissions, addMission, getMissionWithId, getMissionWithTitle, updateMissionStatut ,deleteMission} from '../controllers/missionsController';

const router = Router();

router.get('/', getMissions);
router.get('/:idM', getMissionWithId);
router.get('/name/:titre', getMissionWithTitle);
router.post('/', addMission);
router.put('/:idM', updateMissionStatut);
router.delete('/:idM', deleteMission);

export default router;
