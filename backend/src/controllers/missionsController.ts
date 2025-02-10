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
       const { titre, description, date_debut, date_fin,  statut ,priorite, anomalies } = req.body;


       // Validation des champs requis
       if (!titre || !description || !date_debut || !date_fin || !priorite || !anomalies || !statut) {
           const error = new Error('Tous les champs requis (titre, description, date_debut, date_fin, priorite, anomalies, statut) doivent être fournis.');
           (error as any).status = 400;
           throw error;
       }


       // Création de la nouvelle mission
       const newMission = await Missions.create({
           titre,
           description,
           date_debut,
           date_fin,
           statut, 
           priorite,
           anomalies
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













