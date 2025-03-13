import { DataTypes } from 'sequelize';
import sequelize from '../config/bd';
import bcrypt from 'bcryptjs';

export const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'moderator', 'user'), 
        defaultValue: 'user',
        allowNull: false,
      },
  },
  {
    hooks: {
      beforeCreate: async (user: any) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
    },
  }
);

export const initUserModel = async () => {
    await User.sync();
  }; // Crée la table si elle n'existe pas
