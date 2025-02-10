import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/bd';
import Missions from './missions';
import Competences from './competences';

export class Requerir extends Model {
  public idM!: number;
  public idC!: string;
  public quantite!: number;
  public statut!: 'en attente' | 'partiellement satisfait' | 'satisfait';
    Competences: any;
}

Requerir.init(
  {
    idM: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Missions,
        key: 'idM',
      },
      onDelete: 'CASCADE',
    },
    idC: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: Competences,
        key: 'idC',
      },
      onDelete: 'CASCADE',
    },
    quantite: {
      type: DataTypes.INTEGER,
    },
    statut: {
      type: DataTypes.ENUM('en attente', 'partiellement satisfait', 'satisfait'),
      defaultValue: 'en attente',
    },
  },
  {
    sequelize,
    modelName: 'Requerir',
    tableName: 'Requerir',
    timestamps: false,
  }
);

// Définir les associations
Requerir.belongsTo(Missions, { foreignKey: 'idM' });
Requerir.belongsTo(Competences, { foreignKey: 'idC' });

export default Requerir;