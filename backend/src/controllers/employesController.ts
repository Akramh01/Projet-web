import { Request, Response } from 'express';
import { Employes } from '../models/employes';

export const getEmployes = async (req: Request, res: Response) => {
    try {
        const employes = await Employes.findAll();
        res.status(200).json(employes);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Erreur lors de la récupération des employes'});
    }
};

export const addEmployes = async (req: Request, res: Response) => {
    try {
        const { prenom, nom, date_entree } = req.body;
        const newEmployes = await Employes.create({ prenom, nom ,date_entree});
        res.status(201).json(newEmployes);
    } catch {
        res.status(500).json({error: 'Erreur lors de l’ajout de l\'employe'});
    }
};

export const getEmployeWithId = async (req: Request, res: Response) => {
  try {
      const employe = await Employes.findByPk(req.params.idE);
      if(!employe) {
          res.status(404).json({error: 'Employé non trouvé'});
      }
      res.status(200).json(employe);
  } catch (error){
      console.error(error);
      res.status(500).json({error: 'Erreur lors de la recupération de l\'employe'})
    }
};

export const getEmployeWithName = async (req: Request, res: Response) => {
  try {
    const {nom, prenom} = req.query;
    if (!nom || !prenom) {
        const employe = await Employes.findOne({
            where: {
                nom: nom,
                prenom: prenom,
            },
        });
        if (!employe) {
            res.status(404).json({error: 'Employé non trouvé'});
        }
        res.status(200).json(employe);
    }
  } catch (error) {
      console.log(error);
      res.status(500).json({error: 'Erreur lors de la recupération de l\'employe'})
  }
}

exports.getEmployeWithId = getEmployeWithId;
exports.getEmployes = getEmployes;