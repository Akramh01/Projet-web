import { Request, Response } from 'express';
import { Competences } from '../models/competences';
import { Employes } from '../models/employes';
import { Avoir } from '../models/avoir';

export const getCompetencesWithNameEmployes = async (req: Request, res: Response) => {
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

export const getEmployesWithNameCompetences = async (req: Request, res: Response) => {
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

        const { nom, prenom, nom_fr, niveau } = req.body;

        // Récupérer l'employé par nom et prénom
        const employe = await Employes.findOne({ where: { nom, prenom } });
        if (!employe) {
            const error = new Error('Employé non trouvé.');
            (error as any).status = 404;
            throw error;
        }

        // Récupérer la compétence par nom
        const competence = await Competences.findOne({ where: { nom_fr: nom_fr } });
        if (!competence) {
            const error = new Error('Compétence non trouvée.');
            (error as any).status = 404;
            throw error;
        }

        // Créer l'association entre l'employé et la compétence
        const avoir = await Avoir.create({ idE: employe.idE, idC: competence.idC, niveau: req.body.niveau });

        res.status(201).json(avoir);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};