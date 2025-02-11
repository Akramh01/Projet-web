import { Router } from 'express';
import { getMissions, addMission, getMissionWithId, getMissionWithTitle, updateMissionStatut ,updateMission,deleteMission} from '../controllers/missionsController';

const router = Router();

router.get('/', getMissions);
router.get('/id', getMissionWithId);
router.get('/name', getMissionWithTitle);
router.post('/', addMission);
router.put('/:idM', updateMissionStatut);
router.put('/updatem/:idM', updateMission);
router.delete('/:idM', deleteMission);

export default router;
