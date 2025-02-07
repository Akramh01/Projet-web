import express from 'express';

import {
  linkMissionEmploye,
  getEmployesWithIdMission,
  getMissionsWithIdEmploye,
  deleteAffectation
} from '../controllers/affecterController';

const router = express.Router();

router.post('/link', linkMissionEmploye);
router.get('/employes', getEmployesWithIdMission);
router.get('/missions', getMissionsWithIdEmploye);
router.delete('/delete/:idE/:idM', deleteAffectation);

export default router;

