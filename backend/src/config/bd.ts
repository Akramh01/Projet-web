import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

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

// Tester la connexion
sequelize.authenticate()
  .then(() => console.log('Connexion réussie à MySQL'))
  .catch((err) => console.error('Erreur de connexion à MySQL :', err));

export default sequelize;
