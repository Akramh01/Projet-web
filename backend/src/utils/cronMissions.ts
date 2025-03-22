import cron from 'node-cron';
import { Missions } from '../models/missions';

export function CronMissions() {
  // Passer les missions planifiées à "en cours"
  cron.schedule('0 * * * *', async () => { // Toutes les heures
    console.log('Vérification des missions planifiées...');
    const now = new Date();
    const missions = await Missions.findAll({ where: { statut: 'planifiée' } });

    for (const mission of missions) {
      if (new Date(mission.date_debut) <= now) {
        mission.statut = 'en cours';
        await mission.save();
        console.log(`Mission ${mission.idM} est maintenant "en cours"`);
      }
    }
  });

  // Passer les missions en cours à "terminée"
  cron.schedule('0 * * * *', async () => { // Toutes les heures
    console.log('Vérification des missions en cours...');
    const now = new Date();
    const missions = await Missions.findAll({ where: { statut: 'en cours' } });

    for (const mission of missions) {
      if (new Date(mission.date_fin) <= now) {
        mission.statut = 'terminée';
        await mission.save();
        console.log(` Mission ${mission.idM} est maintenant "terminée"`);
      }
    }
  });

 
}
