import { Router } from 'express';
import { getMissions, addMission, getMissionWithId, getMissionWithTitle, updateMissionStatut ,deleteMission} from '../controllers/missionsController';

const router = Router();

router.get('/', getMissions);
router.get('/id/:idM', getMissionWithId);
router.get('/name/:titre', getMissionWithTitle);
router.post('/add', addMission);
router.put('/update/:idM', updateMissionStatut);
router.delete('/delete/:idM', deleteMission);

export default router;
