import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

import User from './User';
import Topic from './Topic';

class Note extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number;
  public topicId!: number | null;
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
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Topics',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Note',
  }
);

Note.belongsTo(User, { foreignKey: 'userId', as: 'owner' });
User.hasMany(Note, { foreignKey: 'userId', as: 'notes' });

Note.belongsTo(Topic, { foreignKey: 'topicId', as: 'topic' });
Topic.hasMany(Note, { foreignKey: 'topicId', as: 'notes' });

export default Note;
