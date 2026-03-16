import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Topic extends Model {
  public id!: number;
  public label!: string;
  public color!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Topic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(20),
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
    modelName: 'Topic',
  }
);

Topic.belongsTo(User, { foreignKey: 'userId', as: 'owner' });
User.hasMany(Topic, { foreignKey: 'userId', as: 'topics' });

export default Topic;
