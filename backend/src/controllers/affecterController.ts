import { Request, Response } from 'express';
import { Affecter } from '../models/affecter';
import { Employes } from '../models/employes'; 
import { Missions } from '../models/missions'; 


export const linkMissionEmploye = async (req: Request, res: Response) => {
  const { idE, idM, date_affectation } = req.body;

  try {
    const employe = await Employes.findByPk(idE);
    const mission = await Missions.findByPk(idM);

    if (!employe || !mission) {
      res.status(404).json({ message: 'Employé ou Mission non trouvé' });
    }

    const affectation = await Affecter.create({
      idE,
      idM,
      date_affectation,
    });

    res.status(201).json(affectation);
  } catch (error) {
    console.error('Erreur lors de la création de l\'affectation :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getEmployesWithIdMission = async (req: Request, res: Response) => {
    try {
        const idM = req.params.idM;

        // Vérifier si la mission existe
        const mission = await Missions.findByPk(idM);
        if (!mission) {
            const error = new Error('Mission non trouvée.');
            (error as any).status = 404;
            throw error;
        }

        // Récupérer les employés affectés à cette mission
        const affectations = await Affecter.findAll({
            where: { idM },
            include: [Employes]
        });

        // Structurer la réponse
        const response = {
            mission: {
                idM: mission.idM,
                titre: mission.titre,
                description: mission.description,
                employes: affectations.map(affectation => ({
                    idE: affectation.Employe.idE,
                    nom: affectation.Employe.nom,
                    prenom: affectation.Employe.prenom
                }))
            }
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Erreur dans getEmployesWithIdMission:', error);
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};


export const getMissionsWithIdEmploye = async (req: Request, res: Response) => {
    try {
        const idE = req.params.idE;

        // Vérifier si l'employé existe
        const employe = await Employes.findByPk(idE);
        if (!employe) {
            const error = new Error('Employé non trouvé.');
            (error as any).status = 404;
            throw error;
        }

        // Récupérer les missions de cet employé
        const affectations = await Affecter.findAll({
            where: { idE },
            include: [Missions]
        });

        // Structurer la réponse
        const response = {
            employe: {
                idE: employe.idE,
                nom: employe.nom,
                prenom: employe.prenom,
                missions: affectations.map(affectation => ({
                    idM: affectation.Mission.idM,
                    titre: affectation.Mission.titre,
                    description: affectation.Mission.description
                }))
            }
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Erreur dans getMissionsWithIdEmploye:', error);
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
  


export const deleteAffectation = async (req: Request, res: Response) => {
    try {
        const { idE, idM } = req.params;

        // Vérification des IDs
        if (!idE || !idM || isNaN(Number(idE)) || isNaN(Number(idM))) {
            const error = new Error('ID d\'employé ou de mission manquant ou invalide.');
            (error as any).status = 400;
            throw error;
        }

        // Vérifie si l'affectation existe dans la base de données
        const affectation = await Affecter.findOne({ where: { idE, idM } });
        if (!affectation) {
            const error = new Error('Affectation non trouvée.');
            (error as any).status = 404;
            throw error;
        }

        // Supprime l'affectation
        await affectation.destroy();
        res.status(200).json({ message: `Affectation de l'employé ${idE} à la mission ${idM} supprimée avec succès.` });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'affectation :', error);
        // L'erreur est transmise au middleware global (si configuré)
        throw error;
    }
};


