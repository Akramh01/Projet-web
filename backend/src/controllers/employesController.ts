import { Request, Response } from 'express';
import { Employes } from '../models/employes';

export const getEmployes = async (req: Request, res: Response) => {
    try {
        const employes = await Employes.findAll();
        res.status(200).json(employes);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Erreur lors de la récupération des employes.'});
    }
}

export const addEmployes = async (req: Request, res: Response) => {
    try {
        const { prenom, nom, date_embauche } = req.body;
        if (!nom || !prenom || !date_embauche) {
            const error = new Error('Nom et prénom et date d\'embauche sont requis.');
            (error as any).status = 400;
            throw error;
        }
        const newEmployes = await Employes.create({ prenom, nom ,date_embauche, statut: 'Inactif' });
        res.status(201).json(newEmployes);
    } catch {
        res.status(500).json({error: 'Erreur lors de l’ajout de l\'employe.'});
    }
}

export const getEmployeWithId = async (req: Request, res: Response) => {
    try {
        const idE = req.query.idE as string;
  
        // Récupérer l'employé par ID
        const employe = await Employes.findByPk(idE);
        if (!employe) {
            const error = new Error('Employé non trouvé.');
            (error as any).status = 404;
            throw error;
        }
        res.status(200).json(employe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'employé.' });
    }
  }
  
  export const getEmployeWithName = async (req: Request, res: Response) => {
    try {
      const nom = req.query.nom as string;
      const prenom = req.query.prenom as string;
  
      // Validation des paramètres
      if (!nom || !prenom) {
          const error = new Error('Nom et prénom requis.');
          (error as any).status = 400;
          throw error;
      }
  
      // Récupérer l'employé par nom et prénom
      const employe = await Employes.findOne({
          where: {
              prenom: prenom,
              nom: nom,
          },
      });
  
      // Si rien n'est retourné
      if (!employe) {
          const error = new Error('Employé non trouvé.');
          (error as any).status = 404;
          throw error;
      }
      res.status(200).json(employe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'employé.' });
    }
  }

export const deleteEmploye = async (req: Request, res: Response) => {
    try {
        if (!req.params.idE) {
            const error = new Error('ID manquant.');
            (error as any).status = 400;
            throw error;
        }
        // Vérifie si l'employé existe dans la base de données
        const employe = await Employes.findByPk(req.params.idE);
        if (!employe) {
            const error = new Error('Employé non trouvé.');
            (error as any).status = 404;
            throw error;
        }
        // Supprime l'employé
        await Employes.destroy();
        res.status(200).json({ message: `Employé avec l'ID ${req.params.idE} supprimé avec succès.` });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'employé:', error);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
};


