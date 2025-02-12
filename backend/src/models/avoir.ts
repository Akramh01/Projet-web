import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/bd';
import { Employes } from './employes';
import { Competences } from './competences';


export class Avoir extends Model {
    public idE!: number;
    public idC!: string;
    Competence: any;
    Employe: any;
}

Avoir.init(
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
        idC: {
            type: DataTypes.STRING,
            primaryKey: true,
            references: {
                model: Competences,
                key: 'idC',
            },
            onDelete: 'CASCADE',
        },
    },
    {
        sequelize,
        modelName: 'Avoir',
        tableName: 'Avoir',
        timestamps: false,
    }
);

// Définir les associations
Avoir.belongsTo(Employes, { foreignKey: 'idE' });
Avoir.belongsTo(Competences, { foreignKey: 'idC' });

export default Avoir;