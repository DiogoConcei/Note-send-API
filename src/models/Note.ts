import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

import User from './User';

class Note extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number; // Adicionado para integridade de dados
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Note',
  }
);

// Define o relacionamento (opcional se você não usar belongsTo depois, mas recomendado)
Note.belongsTo(User, { foreignKey: 'userId', as: 'owner' });
User.hasMany(Note, { foreignKey: 'userId', as: 'notes' });

export default Note;
