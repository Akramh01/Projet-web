import sequelize from './bd';

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie ! 🚀');
  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données :', error);
  }
};

testConnection();
