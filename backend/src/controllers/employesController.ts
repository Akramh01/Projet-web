import { Request, Response } from 'express';
import { Employes } from '../models/employes';

export const getEmployes = async (req: Request, res: Response) => {
    try {
        const employes = await Employes.findAll();
        res.status(200).json(employes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Erreur lors de la récupération des employes'});
    }
}

export const addEmployes = async (req: Request, res: Response) => {
    try {
        const { prenom, nom, date_embauche, poste } = req.params;
        if (!nom || !prenom || !date_embauche || !poste) {
            return res.status(400).json({ error: 'Nom et prénom et date d\'embauche et le poste sont requis' });
        }
        const newEmployes = await Employes.create({ prenom, nom ,date_embauche, poste, statut: 'actif' });
        res.status(201).json(newEmployes);
    } catch {
        return res.status(500).json({error: 'Erreur lors de l’ajout de l\'employe'});
    }
}

export const getEmployeWithId = async (req: Request, res: Response) => {
  try {
      //On recupére les informations avex les paramètres
      const employe = await Employes.findByPk(req.params.idE);
      if(!employe) {
          return res.status(404).json({error: 'Employé non trouvé'});
      }
      res.status(200).json(employe);
  } catch (error){
      console.error(error);
      return res.status(500).json({error: 'Erreur lors de la recupération de l\'employe'})
    }
}

export const getEmployeWithName = async (req: Request, res: Response) => {
  try {
    const nom = req.params.nom;
    const prenom = req.params.prenom;
    // Validation des paramètres
    if (!nom || !prenom) {
      return res.status(400).json({ error: 'Nom et prénom sont requis' });
    }
    //On recupére les informations avex les paramètres
    const employe = await Employes.findOne({
        where: {
            prenom: prenom,
            nom: nom,
        },
    });
    //Si rien n'est retourné
    if (!employe) {
        return res.status(404).json({error: 'Employé non trouvé'});
    }
    res.status(200).json(employe);
  } catch (error) {
      console.log(error);
      return res.status(500).json({error: 'Erreur lors de la recupération de l\'employe'})
  }
}

exports.getEmployeWithId = getEmployeWithId;
exports.getEmployes = getEmployes;
