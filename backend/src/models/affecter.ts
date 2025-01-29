import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/bd';
import Employes from './employes';
import Missions from './missions';

export class Affecter extends Model {
  public idE!: number;
  public idM!: number;
  public date_affectation!: Date;
}

Affecter.init(
  {
    idE: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Employes,
        key: 'idE',
      },
      onDelete: 'CASCADE',
    },
    idM: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Missions,
        key: 'idM',
      },
      onDelete: 'CASCADE',
    },
    date_affectation: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Affecter',
    tableName: 'Affecter',
    timestamps: false,
  }
);

// Définir les associations
Affecter.belongsTo(Employes, { foreignKey: 'idE' });
Affecter.belongsTo(Missions, { foreignKey: 'idM' });

export default Affecter;