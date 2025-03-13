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

    // Mettre à jour le statut de l'employé à "actif" si ce n'est pas déjà le cas
    if (employe && employe?.statut !== 'Actif') {
        employe.statut = 'Actif';
        await employe.save();
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
        const idM = req.query.idM;

        // Vérifier si la mission existe
        const mission = await Missions.findOne({ where: {idM} });
        if (!mission) {
            const error = new Error('Mission non trouvée.');
            (error as any).status = 404;
            throw error;
        }

        // Récupérer les employés affectés à cette mission
        const affectations = await Affecter.findAll({
            where: { idM: mission.idM },
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
        const idE = req.query.idE;

        // Vérifier si l'employé existe
        const employe = await Employes.findOne({ where: {idE} });
        if (!employe) {
            const error = new Error('Employé non trouvé.');
            (error as any).status = 404;
            throw error;
        }

        // Récupérer les missions de cet employé
        const affectations = await Affecter.findAll({
            where: { idE : employe.idE },
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

        // Vérifier si l'employé a encore des missions affectées
        const affectationsRestantes = await Affecter.count({ where: { idE } });

        if (affectationsRestantes === 0) {
            const employe = await Employes.findByPk(idE);
            if (employe) {
                employe.statut = 'Inactif';
                await employe.save();
            }
        }

        res.status(200).json({ message: `Affectation de l'employé ${idE} à la mission ${idM} supprimée avec succès.` });

    } catch (error) {
        console.error('Erreur lors de la suppression de l\'affectation :', error);
        // L'erreur est transmise au middleware global (si configuré)
        throw error;
    }
};

export const replaceEmployeInMission = async (req: Request, res: Response) => {
    const { idEActuel, idENouveau, idM } = req.body;

    try {
        // Vérifier si les employés et la mission existent
        const employeActuel = await Employes.findByPk(idEActuel);
        const employeNouveau = await Employes.findByPk(idENouveau);
        const mission = await Missions.findByPk(idM);

        if (!employeActuel || !employeNouveau || !mission) {
            res.status(404).json({ message: 'Employé ou Mission non trouvé' });
            return; 
        }

        // Vérifier si l'employé actuel est bien affecté à la mission
        const affectationActuelle = await Affecter.findOne({
            where: { idE: idEActuel, idM: idM }
        });

        if (!affectationActuelle) {
            res.status(404).json({ message: 'L\'employé actuel n\'est pas affecté à cette mission' });
            return;
        }

        // Désaffecter l'employé actuel de la mission
        await affectationActuelle.destroy();

        // Affecter le nouvel employé à la mission
        const nouvelleAffectation = await Affecter.create({
            idE: idENouveau,
            idM: idM,
            date_affectation: new Date() 
        });

        // Mettre à jour le statut de l'employé actuel si nécessaire
        const affectationsRestantes = await Affecter.count({ where: { idE: idEActuel } });
        if (affectationsRestantes === 0) {
            employeActuel.statut = 'Inactif';
            await employeActuel.save();
        }

        // Mettre à jour le statut du nouvel employé à "Actif" si ce n'est pas déjà le cas
        if (employeNouveau.statut !== 'Actif') {
            employeNouveau.statut = 'Actif';
            await employeNouveau.save();
        }

        res.status(200).json({ message: 'Employé remplacé avec succès', nouvelleAffectation });
    } catch (error) {
        console.error('Erreur lors du remplacement de l\'employé :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};