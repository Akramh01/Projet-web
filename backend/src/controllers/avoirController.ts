import { Request, Response } from 'express';
import { Competences } from '../models/competences';
import { Employes } from '../models/employes';
import { Avoir } from '../models/avoir';
import {Requerir} from '../models/requerir';


export const getRecommendations = async (req: Request, res: Response) => {
    try {
        const idM = req.query.idM;

        // Vérifier si l'ID de la mission est fourni
        if (!idM) {
            const error = new Error('L\'ID de la mission est requis.');
            (error as any).status = 400;
            throw error;
        }

        // Récupérer les compétences requises pour la mission
        const competencesRequises = await Requerir.findAll({
            where: { idM: idM },
            attributes: ['idC'],
        });

        // Si aucune compétence n'est requise, retourner une liste vide
        if (competencesRequises.length === 0) {
            res.json({ message: 'Aucune compétence requise pour cette mission.', recommendations: [] });
        }

        // Récupérer les employés ayant ces compétences
        const employesRecommandes = await Avoir.findAll({
            where: {
                idC: competencesRequises.map(c => c.idC),
            },
            include: [{
                model: Employes,
                as: 'Employe',
            }],
        });

        // Grouper les employés par nombre de compétences correspondantes
        const employesParCompetence: { [key: number]: { employe: any, competencesCorrespondantes: number } } = {};

        employesRecommandes.forEach(avoir => {
            const idE = avoir.idE;
            if (!employesParCompetence[idE]) {
                employesParCompetence[idE] = {
                    employe: avoir.Employe,
                    competencesCorrespondantes: 0,
                };
            }
            employesParCompetence[idE].competencesCorrespondantes++;
        });

        // Trier les employés par nombre de compétences correspondantes
        const employesTries = Object.values(employesParCompetence).sort((a, b) => 
            b.competencesCorrespondantes - a.competencesCorrespondantes
        );

        // Structurer la réponse
        const response = {
            idM,
            recommendations: employesTries.map(e => ({
                employe: e.employe,
                competencesCorrespondantes: e.competencesCorrespondantes,
            })),
        };

        res.json(response);
    } catch (error) {
        console.error('Erreur dans getRecommendations :', error);
        const typedError = error as any;
        res.status(typedError.status || 500).json({ message: 'Erreur serveur', error: typedError.message });
    }
};




export const getCompetencesWithIdEmployes = async (req: Request, res: Response) => {
    try {
        const idE = req.query.idE;

        // Récupérer l'employé par nom et prénom
        const employe = await Employes.findOne({ where: { idE } });
        if (!employe) {
            const error = new Error('Employé non trouvé.');
            (error as any).status = 404;
            throw error;
        }

        // Récupérer les compétences de l'employé
        const avoirs = await Avoir.findAll({
            where: { idE: employe.idE },
            include: [Competences]
        });

        // Structurer la réponse pour regrouper les compétences sous un même employé
        const response = {
            employe,
            competences: avoirs.map(avoir => avoir.Competence)
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

export const getEmployesWithIdCompetences = async (req: Request, res: Response) => {
    try {
        //const nomCompetence = req.query.nomCompetence as string;
        const idC = req.query.idC as string;

        // Récupérer la compétence par nom
        const competence = await Competences.findOne({ where: { idC } });
        if (!competence) {
            const error = new Error('Compétence non trouvée.');
            (error as any).status = 404;
            throw error;
        }

        // Récupérer les employés ayant cette compétence
        const avoirs = await Avoir.findAll({
            where: { idC: competence.idC },
            include: [Employes]
        });

        // Structurer la réponse pour regrouper les employés sous une même compétence
        const response = {
            competence,
            employes: avoirs.map(avoir => avoir.Employe)
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};





export const linkEmployeCompetences = async (req: Request, res: Response) => {
    try {

        const { idE, idC} = req.body;

        // Récupérer l'employé par nom et prénom
        const employe = await Employes.findOne({ where: { idE } });
        if (!employe) {
            const error = new Error('Employé non trouvé.');
            (error as any).status = 404;
            throw error;
        }

        // Récupérer la compétence par nom
        const competence = await Competences.findOne({ where: { idC } });
        if (!competence) {
            const error = new Error('Compétence non trouvée.');
            (error as any).status = 404;
            throw error;
        }

        // Créer l'association entre l'employé et la compétence
        const avoir = await Avoir.create({ idE: employe.idE, idC: competence.idC});

        res.status(201).json(avoir);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};