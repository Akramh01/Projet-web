import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/bd';

export class Personnel extends Model {
  public id!: number;
  public prenom!: string;
  public nom!: string;
  public date_entree!: Date;
}

Personnel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_entree: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Personnel',
    tableName: 'Employes',
    timestamps: false,
  }
);
