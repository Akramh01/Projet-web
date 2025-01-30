import { Router } from 'express';
import { getMissions, addMission, getMissionWithId, getMissionWithTitle, updateMissionStatut } from '../controllers/missionsController';

const router = Router();

router.get('/', getMissions);
router.get('/id/:idM', getMissionWithId);

router.get('/name/:titre', getMissionWithTitle);

router.post('/add/:titre/:description/:date_debut/:date_fin/:priorite/:anomalies', addMission);

router.put('/update-status/:idM', updateMissionStatut);

export default router;


