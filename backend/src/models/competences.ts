import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/bd';

class Missions extends Model {
  public idM!: number;
  public titre!: string;
  public description!: string;
  public date_debut!: Date;
  public date_fin!: Date;
  public statut!: 'préparation' | 'planifiée' | 'en cours' | 'terminée';
  public priorite!: 'basse' | 'moyenne' | 'haute';
  public anomalies!: string;
}

Missions.init(
  {
    idM: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date_debut: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_fin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    statut: {
      type: DataTypes.ENUM('préparation', 'planifiée', 'en cours', 'terminée'),
      allowNull: false,
    },
    priorite: {
      type: DataTypes.ENUM('basse', 'moyenne', 'haute'),
      defaultValue: 'moyenne',
    },
    anomalies: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'Missions',
    tableName: 'missions',
    timestamps: false,
  }
);

export default Missions;