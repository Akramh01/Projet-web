import express from 'express';

import {
  linkMissionEmploye,
  getEmployesWithIdMission,
  getMissionsWithIdEmploye,
  deleteAffectation,
  replaceEmployeInMission	
} from '../controllers/affecterController';

const router = express.Router();

router.post('/link', linkMissionEmploye);
router.get('/employes', getEmployesWithIdMission);
router.get('/missions', getMissionsWithIdEmploye);
router.delete('/:idE/:idM', deleteAffectation);
router.put('/replace', replaceEmployeInMission);

export default router;

