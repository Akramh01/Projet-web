import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });



// Connexion à la base de données
const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT)!,
    dialect: 'mysql',
    logging: false, // Désactiver les logs de requêtes SQL
  }
);
if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
  throw new Error('Les variables d\'environnement DB_USER et DB_PASSWORD doivent être définies.');
}

// Tester la connexion
sequelize.authenticate()
  .then(() => console.log('Connexion réussie à MySQL'))
  .catch((err) => console.error('Erreur de connexion à MySQL :', err));

export default sequelize;