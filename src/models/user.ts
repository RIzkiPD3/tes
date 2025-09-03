import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
    class User extends Model<UserAttributes, UserCreationAttributes> {
        static associate(models: any) {
          User.hasMany(models.Task, { foreignKey: 'user_id', as: 'tasks' });
          User.hasMany(models.Category, { foreignKey: 'user_id', as: 'categories' });
        }
      }
      User.init(
        {
            name: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false, unique: true },
            password: { type: DataTypes.STRING, allowNull: false },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: true,
            underscored: true,
        }
    );
    return User;
};