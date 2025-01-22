import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/bd';

export class Employes extends Model {
  public id!: number;
  public prenom!: string;
  public nom!: string;
  public date_entree!: Date;
}

    Employes.init(
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
    modelName: 'Employes',
    tableName: 'Employes',
    timestamps: false,
  }
);

export default Employes;
