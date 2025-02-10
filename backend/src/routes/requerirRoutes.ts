import express from 'express';



import { 
    linkMissionCompetence, 
    getCompetencesWithIdMission, 
    unlinkCompetence } 
from '../controllers/requerirController';

const router = express.Router();

// Lier une compétence à une mission
router.post('/link', linkMissionCompetence);

// Obtenir les compétences liées à une mission
router.get('/competences/:idM', getCompetencesWithIdMission);

// Dissocier une compétence d'une mission
//router.delete('/:idM/:idC', unlinkCompetence);

export default router;
