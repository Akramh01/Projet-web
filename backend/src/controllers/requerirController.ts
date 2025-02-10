import { Request, Response } from 'express';
import { Missions } from '../models/missions';
import { Competences } from '../models/competences';
import {Requerir} from '../models/requerir';

export const linkMissionCompetence = async (req: Request, res: Response) => {
  const { idC, idM } = req.body;

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






export const getCompetencesWithIdMission = async (req: Request, res: Response) => {
    try {
        const idM = req.query.idM;

        // Vérifier si la mission existe
        const mission = await Missions.findOne({where: { idM }});
        if (!mission) {
            const error = new Error('Mission non trouvée.');
            (error as any).status = 404;
            throw error;
        }

        // Récupérer les compétences affectés à cette mission
        const requirements = await Requerir.findAll({
            where: { idM },
            include: [Competences]
        });

        // Structurer la réponse
        const response = {
            mission: {
                idM: mission.idM,
                titre: mission.titre,
                description: mission.description,
                competences: requirements.map(requirement => ({
                    idC: requirement.Competences.idC,
                    nom_fr: requirement.Competences.nom_fr,
                    nom_en: requirement.Competences.nom_en
                }))
            }
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Erreur dans getCompetencesWithIdMission:', error);
        res.status(500).json({ message: 'Erreur serveur', error });
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



