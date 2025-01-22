import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/bd';

export class Competences extends Model {
  public idC!: string;           // Identifiant unique
  public nom_fr!: string;        // Nom en français
  public nom_en!: string;        // Nom en anglais
}

Competences.init(
  {
    idC: {
      type: DataTypes.STRING(10),
      autoIncrement: true,
      primaryKey: true,
    },
    nom_fr: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nom_en: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Competences',
    tableName: 'Competences',
    timestamps: false,
  }
);

export default Competences;
