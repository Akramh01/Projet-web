import { Request, Response } from 'express';
import { Missions } from '../models/missions';
import { Competences } from '../models/competences';
import {Requerir} from '../models/requerir';

export const linkMissionCompetence = async (req: Request, res: Response) => {
  const { idC, idM } = req.body;
  console.log('Données reçues :', req.body);

  try {
    const competence = await Competences.findByPk(idC);
    const mission = await Missions.findByPk(idM);

    if (!competence || !mission) {
      res.status(404).json({ message: 'Compétence ou Mission non trouvé' });
    }

    const requirement = await Requerir.create({
      idC,
      idM,
    });

    res.status(201).json(requirement);
  } catch (error) {
    console.error('Erreur lors de la liaison d\'une mission à une compétence :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const deleteCompetence = async (req: Request, res: Response) => {
    try {
        const  idM   = req.params.idM;
        const idC = req.params.idC; // Récupérer l'ID de la mission et de la compétence depuis l'URL

        // Vérifier si l'association existe avant de supprimer
        const association = await Requerir.findOne({ where: { idM, idC } });
        if (!association) {
            const error = new Error('Association mission-compétence non trouvée.');
            (error as any).status = 404;
            throw error;

        }

        // Supprimer l'association
        await association.destroy();

        res.status(200).json({ message: "Compétence dissociée de la mission avec succès." });
    } catch (error) {
        console.error('Erreur dans deleteCompetence:', error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

export const updateMissionCompetences = async (req: Request, res: Response) => {
    try {
      // const idM = req.params.idM;
      const { idM, competences } = req.body; // Liste des IDs des compétences
  
      // Vérifier si la mission existe
      const mission = await Missions.findByPk(idM);
      if (!mission) {
        res.status(404).json({ message: 'Mission non trouvée.' });
      }
  
      // Supprimer les anciennes liaisons pour cette mission
      await Requerir.destroy({ where: { idM } });
  
      // Ajouter les nouvelles liaisons
      const newAssociations = competences.map((idC: any) => ({ idM, idC }));
      await Requerir.bulkCreate(newAssociations);
  
      res.status(200).json({ message: 'Liaisons mises à jour avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour des liaisons :', error);
      res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  };

  export const getCompetencesWithIdMission = async (req: Request, res: Response) => {
      try {
          const idM = req.query.idM;
  
          // Récupérer l'employé par nom et prénom
          const mission = await Missions.findOne({ where: { idM } });
          if (!mission) {
              const error = new Error('Mission non trouvé.');
              (error as any).status = 404;
              throw error;
          }
  
          // Récupérer les compétences de l'employé
          const requerirs = await Requerir.findAll({
              where: { idM: mission.idM },
              include: [Competences]
          });
  
          // Structurer la réponse pour regrouper les compétences sous un même employé
          const response = {
              mission,
              competences: requerirs.map(requerir => requerir.Competence)
          };
  
          res.json(response);
      } catch (error) {
          res.status(500).json({ message: 'Erreur serveur', error });
      }
  };