import { Request, Response } from 'express';
import { Missions } from '../models/missions';
import { Affecter} from '../models/affecter';
import {Employes} from '../models/employes';
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
  
// Mise à jour du statut d'une mission
export const updateMissionStatut = async (req: Request, res: Response): Promise<void> => {
  try {
    const { idM } = req.params;

    // Récupérer la mission par son ID
    const mission = await Missions.findByPk(idM);
    if (!mission) {
      const error = new Error('Mission non trouvée.');
      (error as any).status = 404;
      throw error;
    }

    // Gestion automatique du statut en fonction des conditions et du statut actuel
    switch (mission.statut) {
      case 'préparation': {
        // Vérifier que toutes les informations nécessaires sont présentes
        if (!mission.titre || !mission.description || !mission.date_debut || !mission.date_fin) {
          const error = new Error('La mission doit avoir toutes les informations complètes pour être planifiée.');
          (error as any).status = 400;
          throw error;
        }

        // Vérifier que des employés sont affectés à la mission
        const affectations = await Affecter.findAll({ where: { idM }, include: [Employes] });
        if (affectations.length === 0) {
          const error = new Error('La mission doit avoir des employés affectés avant d\'être planifiée.');
          (error as any).status = 400;
          throw error;
        }

        // Passer le statut à "planifiée"
        mission.statut = 'plannifiée';
        await mission.save();
        res.status(200).json({ message: 'La mission a été planifiée avec succès.', mission });
        break;
      }

      case 'plannifiée': {
        // Vérifier si la date de début est atteinte pour passer à "en cours"
        if (new Date() >= new Date(mission.date_debut)) {
          mission.statut = 'en cours';
          await mission.save();
          res.status(200).json({ message: 'La mission a commencé et est maintenant en cours.', mission });
        } else {
          const error = new Error('La mission ne peut pas être mise en cours avant la date de début.');
          (error as any).status = 400;
          throw error;
        }
        break;
      }

      case 'en cours': {
        // Vérifier si la date de fin est atteinte pour passer à "terminée"
        if (new Date() >= new Date(mission.date_fin)) {
          mission.statut = 'terminée';
          await mission.save();
          res.status(200).json({ message: 'La mission est terminée.', mission });
        } else {
          const error = new Error('La mission ne peut pas être terminée avant la date de fin.');
          (error as any).status = 400;
          throw error;
        }
        break;
      }

      case 'terminée': {
        const error = new Error('La mission est déjà terminée et ne peut pas être modifiée.');
        (error as any).status = 400;
        throw error;
      }

      default: {
        const error = new Error('Statut de la mission non reconnu.');
        (error as any).status = 400;
        throw error;
      }
    }
  } catch (error: any) {
    // Si une erreur est levée, elle sera capturée ici.
    console.error('Erreur lors de la mise à jour du statut de la mission:', error);

    // Propager l'erreur pour qu'elle soit traitée par le middleware errorHandler
    throw error;
  }
};
/*
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


      if (!statut) {
          const error = new Error("Le statut n'est pas fourni.");
          (error as any).status = 400;
          throw error;
      }


      if (!mission) {
          const error = new Error('Mission non trouvée.');
          (error as any).status = 404;
          throw error;
      }

      const mission = await Missions.findByPk(idM);


      mission.statut = statut;
      await mission.save();

      if (!mission) {
          const error = new Error('Mission non trouvée.');
          (error as any).status = 404;
          throw error;
      }


      res.status(200).json(mission);
  } catch (error) {
      console.error('Erreur lors de la mise à jour de la mission:', error);
     
  }
};
*/
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

      mission.statut = statut;
      await mission.save();

      res.status(200).json(mission);
  } catch (error) {
      console.error('Erreur lors de la mise à jour de la mission:', error);
     
  }
};
*/
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

