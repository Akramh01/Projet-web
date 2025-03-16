import { DataTypes, Model } from "sequelize";
import sequelize from "../config/bd";
import { User } from "./user";
import { Discussion } from "./discussion";



export class Message extends Model {
  public id!: number;
  public content!: string;
  public userId!: number;
  public discussionId!: number;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    discussionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Discussion,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Message",
  }
);

Message.belongsTo(User, { foreignKey: "userId", as: "author" });
Message.belongsTo(Discussion, { foreignKey: "discussionId", as: "discussion" });

export const initMessageModel = async () => {
  await Message.sync();
};
