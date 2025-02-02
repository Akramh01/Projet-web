import { Router } from 'express';
import { getMissions, addMission, getMissionWithId, getMissionWithTitle, updateMissionStatut ,deleteMission} from '../controllers/missionsController';

const router = Router();

router.get('/', getMissions);
router.get('/id/:idM', getMissionWithId);

router.get('/name/:titre', getMissionWithTitle);

router.post('/add', addMission);

//router.put('/update-status/:idM', updateMissionStatut);
router.put('/update-mission-statut/:idM', updateMissionStatut);
router.delete('/delete-mission/:idM', deleteMission);

export default router;