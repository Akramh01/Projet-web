import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/bd';

export class Employes extends Model {
  public idE!: number;
  public prenom!: string;
  public nom!: string;
  public date_embauche!: Date;
  public statut!: string;
}

    Employes.init(
  {
    idE: {
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
    date_embauche: {
      type: DataTypes.DATEONLY, // Préférer DATEONLY pour les dates sans heure
      allowNull: false,
      /*get() {
        return this.getDataValue('date_embauche').toISOString().split('T')[0];
      }*/
    },
    statut: {
      type: DataTypes.STRING(20),
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
