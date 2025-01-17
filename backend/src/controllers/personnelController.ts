import { Request, Response } from 'express';
import { Personnel } from '../models/personnel';

export const getPersonnels = async (req: Request, res: Response) => {
    try {
        const personnels = await Personnel.findALL();
        res.status(200).json(personnels);
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la récupération des personnels'});
    }
};

export const addPersonnel = async (req: Request, res: Response) => {
    try {
        const { prenom, nom, date_entree } = req.body;
        const newPersonnel = await Personnel.create({ prenom, nom ,date_entree});
        res.status(201).json(newPersonnel);
    } catch {
        res.status(500).json({ error: 'Erreur lors de l’ajout du personnel' });
    }
}