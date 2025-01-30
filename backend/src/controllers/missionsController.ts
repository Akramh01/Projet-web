import { Request, Response } from 'express';
import { Missions } from '../models/missions';

// Récupération de toutes les missions
export const getMissions = async (req: Request, res: Response) => {
	try {
    	const missions = await Missions.findAll();
    	res.status(200).json(missions);
	} catch (error) {
    	console.error('Erreur lors de la récupération des missions:', error);
    	res.status(500).json({ error: 'Erreur lors de la récupération des missions.' });
	}
};

// Ajout d'une mission
export const addMission = async (req: Request, res: Response) => {
	try {
    	const { titre, description, date_debut, date_fin, priorite, anomalies } = req.body;

    	if (!titre || !description || !date_debut || !date_fin || !priorite || !anomalies) {
        	const error = new Error('Tous les champs requis ne sont pas fournis.');
        	(error as any).status = 400;
        	throw error;
    	}

    	const newMission = await Missions.create({
        	titre,
        	description,
        	date_debut,
        	date_fin,
        	statut: 'planifiée',
        	priorite,
        	anomalies,
    	});

    	res.status(201).json(newMission);
	} catch (error) {
    	console.error('Erreur lors de l’ajout de la mission:', error);
		res.status(500).json({error: 'Erreur lors de l’ajout de la mission'}); 
	}
};

// Récupération d'une mission par ID
export const getMissionWithId = async (req: Request, res: Response) => {
	try {
    	const mission = await Missions.findByPk(req.params.idM);

    	if (!mission) {
        	const error = new Error('Mission non trouvée.');
        	(error as any).status = 404;
        	throw error;
    	}

    	res.status(200).json(mission);
	} catch (error) {
    	console.error('Erreur lors de la récupération des informations sur la mission:', error);
    	res.status(500).json({error: 'Erreur lors de la récupération des informations sur la mission'}); 
	}
};

// Récupération d'une mission par titre
export const getMissionWithTitle = async (req: Request, res: Response) => {
	try {
    	const mission = await Missions.findOne({ where: { titre: req.params.titre } });

    	if (!mission) {
        	const error = new Error('Mission non trouvée.');
        	(error as any).status = 404;
        	throw error;
    	}

    	res.status(200).json(mission);
	} catch (error) {
    	console.error('Erreur lors de la récupération des informations sur la mission:', error);
    	res.status(500).json({error: 'Erreur lors de la récupération des informations sur la mission'}); 
	}
};

// Mise à jour du statut d'une mission
export const updateMissionStatut = async (req: Request, res: Response) => {
	try {
    	const idM = req.params.idM;
    	const { statut } = req.body;

    	if (!statut) {
        	const error = new Error("Le statut n'est pas fourni.");
        	(error as any).status = 400;
        	throw error;
    	}

    	const mission = await Missions.findByPk(idM);

    	if (!mission) {
        	const error = new Error('Mission non trouvée.');
        	(error as any).status = 404;
        	throw error;
    	}

    	mission.statut = statut;
    	await mission.save();

    	res.status(200).json(mission);
	} catch (error) {
    	console.error('Erreur lors de la mise à jour de la mission:', error);
    	
	}
};

exports.getMissions = getMissions;
exports.addMission = addMission;
exports.getMissionWithId = getMissionWithId;
exports.getMissionWithTitle = getMissionWithTitle;
exports.updateMissionStatut = updateMissionStatut;




