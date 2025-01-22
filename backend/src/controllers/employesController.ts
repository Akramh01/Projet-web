import { Request, Response } from 'express';
import { Employes } from '../models/employes';

export const getEmployes = async (req: Request, res: Response) => {
    try {
        const employes = await Employes.findAll();
        res.status(200).json(employes);
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la récupération des personnels'});
    }
};

export const addEmployes = async (req: Request, res: Response) => {
    try {
        const { prenom, nom, date_entree } = req.body;
        const newEmployes = await Employes.create({ prenom, nom ,date_entree});
        res.status(201).json(newEmployes);
    } catch {
        res.status(500).json({ error: 'Erreur lors de l’ajout du personnel' });
    }
}