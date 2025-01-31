import { Request, Response } from 'express';
import { Competences } from '../models/competences';

export const getCompetences = async (req: Request, res: Response) => {
    try {
        const competences = await Competences.findAll();
        res.status(200).json(competences);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des compétences' });
    }
};

export const getCompetenceWithId = async (req: Request, res: Response) => {
  try {
      //On recupére les informations avec les paramètres
      const competence = await Competences.findByPk(req.params.idC);
      if(!competence) {
            const error = new Error('Compétence non trouvé.');
            (error as any).status = 404;
            throw error;      
        }
      res.status(200).json(competence);
  } catch (error){
      console.error(error);
      res.status(500).json({error: 'Erreur lors de la recupération des compétences'})
    }
}

export const getCompetenceWithNameFr = async (req: Request, res: Response) => {
    try {
      const nom_fr = req.params.nom_fr;
      console.log(nom_fr);
      if(!nom_fr){
        const error = new Error('Nom en français requis.');
        (error as any).status = 400;
        throw error;
      }
      const competence = await Competences.findOne({
        where: { nom_fr: nom_fr }, // Recherche sur le champ nom_fr
      });
  
      if (!competence) {
        const error = new Error('Compétence introuvable en français.');
        (error as any).status = 404;
        throw error;
      }
  
      res.status(200).json(competence);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des compétences en français' });
    }
  };

export const getCompetenceWithNameEn = async (req: Request, res: Response) => {
    try {
      const nom_en = req.params.nom_en;
        
      if(!nom_en){
        const error = new Error('Nom en Anglais requis.');
        (error as any).status = 400;
        throw error;
      }
      const competence = await Competences.findOne({
        where: { nom_en: nom_en }, // Recherche sur le champ nom_en
      });
  
      if (!competence) {
        const error = new Error('Compétence introuvable en anglais.');
        (error as any).status = 404;
        throw error;
      }
  
      res.status(200).json(competence);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des compétences en anglais' });
    }
 };  

