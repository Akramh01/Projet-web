import { Request, Response } from 'express';
import { Missions } from '../models/missions';
import { Affecter} from '../models/affecter';
import {Employes} from '../models/employes';
import {Requerir} from '../models/requerir';
import { Avoir } from '../models/avoir';
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

// Ajout d'une mission avec le statut par defaut  sera en preparation et aucune anomalie 
export const addMission = async (req: Request, res: Response) => {
    try {
        const { titre, description, date_debut, date_fin, priorite} = req.body;
 
 
        // Validation des champs requis
        if (!titre || !description || !date_debut || !date_fin || !priorite) {
            const error = new Error('Tous les champs requis (titre, description, date_debut, date_fin, priorite) doivent être fournis.');
            (error as any).status = 400;
            throw error;
        }
 
        // Création de la nouvelle mission avec le statut par défaut et anomalies vides
        const newMission = await Missions.create({
            titre,
            description,
            date_debut,
            date_fin,
            statut:'préparation',
            priorite,
            anomalies: "",
        });
 
        // Retourner la mission créée avec un statut 201 (Créé)
        res.status(201).json(newMission);
    } catch (error) {
        console.error('Erreur lors de l’ajout de la mission:', error);
        res.status(500).json({ error: 'Erreur lors de l’ajout de la mission.' });
    }
 };

// Récupération d'une mission par ID
export const getMissionWithId = async (req: Request, res: Response) => {
    try {
      const idM = req.query.idM as string;
  
      // Récupérer la mission par ID
      const mission = await Missions.findByPk(idM);
      if (!mission) {
        const error = new Error('Mission non trouvée.');
        (error as any).status = 404;
        throw error;
      }
      res.status(200).json(mission);
    } catch (error) {
      console.error('Erreur lors de la récupération de la mission:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération de la mission.' });
    }
  };

// Récupération d'une mission par titre
export const getMissionWithTitle = async (req: Request, res: Response) => {
	try {
	  const titre = req.query.titre;
	  
	  // Validation du paramètre
	  if (!titre) {
		  const error = new Error('Le titre de la mission est requis.');
		  (error as any).status = 400;
		  throw error;
	  }
  
	  // On récupère la mission avec le titre spécifié
	  const mission = await Missions.findOne({
		  where: { titre }
	  });
  
	  // Si aucune mission n'est trouvée
	  if (!mission) {
		  const error = new Error('Mission non trouvée.');
		  (error as any).status = 404;
		  throw error;
	  }
  
	  res.status(200).json(mission);
	} catch (error) {
		console.error('Erreur lors de la récupération de la mission:', error);
		res.status(500).json({ error: 'Erreur lors de la récupération de la mission.' });
	}
  };
 
"// Mise à jour du statut par défaut (préparation) pour le passer à planifié"
export const updateMissionStatut = async (req: Request, res: Response): Promise<void> => {
	try {
    	const { idM } = req.params;

    	// Récupération de la mission
    	const mission = await Missions.findByPk(idM);
    	if (!mission) {
        	const error = new Error('Mission non trouvée.');
        	(error as any).status = 404;
        	throw error;
    	}

    	if (mission.statut !== 'préparation') {
        	const error = new Error('Seules les missions en préparation peuvent être planifiées.');
        	(error as any).status = 400;
        	throw error;
    	}
        // vérification la présence de toute les données de la mission
    	if (!mission.titre || !mission.description || !mission.date_debut || !mission.date_fin) {
        	const error = new Error('Toutes les informations doivent être complètes pour planifier la mission.');
        	(error as any).status = 400;
        	throw error;
    	}

    	// Vérifier qu'au moins un employé est affecté
    	const affectationsCollaborateurs = await Affecter.findAll({ where: { idM } });
    	if (affectationsCollaborateurs.length === 0) {
        	const error = new Error("Il faut au moins un employé affecté pour planifier la mission.");
        	(error as any).status = 400;
        	throw error;
    	}

    	// Vérifier que toutes les compétences requises sont couvertes
	const rcompetences = await Requerir.findAll({ where: { idM } });
	for (const  rcompetence of rcompetences) {
  	const nbPersonnesAvecCompetence = await Avoir.count({ where: { idC: rcompetence.idC } });
    if (nbPersonnesAvecCompetence === 0) {
      const error = new Error(`Aucune personne ne possède la compétence requise: ${rcompetence.idC}`);
      (error as any).status = 400;
      throw error;
  }
  }

    	// Mettre à jour le statut de la mission
    	mission.statut = 'planifiée';
    	await mission.save();

    	res.status(200).json({ message: 'Mission planifiée avec succès.', mission });
	} catch (error) {
    	console.error('Erreur mise à jour statut mission:', error);
    
	}
};
//modifier une mission 
export const updateMission =  async (req: Request, res: Response) => {
  try {
      const idM = req.params.idM;
      const { titre, description, date_debut, date_fin, priorite } = req.body;

      // Trouver la mission par ID
      const mission = await Missions.findByPk(idM);
      if (!mission) {
          res.status(404).json({ message: 'Mission non trouvée.' });
          return;
      }

      // Vérifier le statut
      if (mission.statut === 'en cours' || mission.statut === 'terminée') {
          res.status(400).json({ message: 'La mission est en cours ou terminée et ne peut pas être modifiée.' });
          return;
      }

      // Mise à jour des champs
      mission.titre = titre || mission.titre;
      mission.description = description || mission.description;
      mission.date_debut = date_debut || mission.date_debut;
      mission.date_fin = date_fin || mission.date_fin;
      mission.priorite = priorite || mission.priorite;

      // Sauvegarder dans la base de données
      await mission.save();

      // Retourner la mission mise à jour
      res.status(200).json(mission);
  } catch (error) {
      console.error('Erreur lors de la mise à jour de la mission :', error);
     
  }
};


  
//supprimer une missions 

export const deleteMission = async (req: Request, res: Response) => {
    try {
        const idM = req.params.idM;

        // Vérification de la présence de l'ID
        if (!idM || isNaN(Number(idM))) {
            const error = new Error('ID de mission manquant ou invalide.');
            (error as any).status = 400;
            throw error;
        }

        // Vérifie si la mission existe dans la base de données
        const mission = await Missions.findByPk(idM);
        if (!mission) {
            const error = new Error('Mission non trouvée.');
            (error as any).status = 404;
            throw error;
        }

        // Supprime la mission
        await mission.destroy();
        res.status(200).json({ message: `Mission avec l'ID ${idM} supprimée avec succès.` });
    } catch (error) {
        console.error('Erreur lors de la suppression de la mission:', error);
        // L'erreur est transmise au middleware global (si configuré)
        throw error;
    }

  };