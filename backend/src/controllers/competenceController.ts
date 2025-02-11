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
      const idC = req.query.idC as string;

      // Récupérer la compétence par ID
      const competence = await Competences.findByPk(idC);
      if (!competence) {
        const error = new Error('Compétence non trouvée.');
        (error as any).status = 404;
        throw error;
      }
      res.status(200).json(competence);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des compétences' });
  }
}

export const getCompetenceWithNameFr = async (req: Request, res: Response) => {
  try {
    const nom_fr = req.query.nom_fr as string;

    if (!nom_fr) {
      const error = new Error('Nom en français requis.');
      (error as any).status = 400;
      throw error;
    }

    // Récupérer la compétence par nom en français
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
}

export const getCompetenceWithNameEn = async (req: Request, res: Response) => {
  try {
    const nom_en = req.query.nom_en as string;

    if (!nom_en) {
      const error = new Error('Nom en anglais requis.');
      (error as any).status = 400;
      throw error;
    }

    // Récupérer la compétence par nom en anglais
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
}

