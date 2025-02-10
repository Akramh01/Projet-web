import { Sequelize } from 'sequelize';

// Connexion à la base de données
const sequelize = new Sequelize(
  process.env.DB_NAME || 'db-web-project',
  process.env.DB_USER || 'admin',
  process.env.DB_PASSWORD || 'Karima-0102',
  {
    host: process.env.DB_HOST || 'db-web-project.c7y2gyumqs5j.eu-north-1.rds.amazonaws.com',
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
