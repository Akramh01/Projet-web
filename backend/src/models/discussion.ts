import { DataTypes, Model } from "sequelize";
import sequelize from "../config/bd";
import { User } from "./user";

export class Discussion extends Model {
  public id!: number;
  public title!: string;
  public userId!: number;
}

Discussion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Discussion",
  }
);

Discussion.belongsTo(User, { foreignKey: "userId", as: "author" });

export const initDiscussionModel = async () => {
  await Discussion.sync();
};

