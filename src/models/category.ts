import { Model, DataTypes, Sequelize } from 'sequelize';

interface CategoryAttributes {
  id?: number;
  name: string;
  description?: string;
  user_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

interface CategoryCreationAttributes extends Omit<CategoryAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
  class Category extends Model<CategoryAttributes, CategoryCreationAttributes> {
    static associate(models: any) {
      Category.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Category.hasMany(models.Task, { foreignKey: 'category_id', as: 'tasks' });
    }
  }
  Category.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true }
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
      timestamps: true,
      underscored: true
    }
  );
  return Category;
};
