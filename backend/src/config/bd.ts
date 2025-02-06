import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Connexion à la base de données
const sequelize = new Sequelize(
  process.env.DB_NAME || 'db-web-project',
  process.env.DB_USER || 'admin',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false, // Désactiver les logs de requêtes SQL
  }
);

// Tester la connexion
sequelize.authenticate()
  .then(() => console.log('Connexion réussie à MySQL'))
  .catch((err) => console.error('Erreur de connexion à MySQL :', err));

export default sequelize;
