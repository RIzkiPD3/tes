import { Model, DataTypes, Sequelize } from 'sequelize';

interface TaskAttributes {
  id?: number;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date?: Date;
  user_id: number;
  category_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

interface TaskCreationAttributes extends Omit<TaskAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
  class Task extends Model<TaskAttributes, TaskCreationAttributes> {
    static associate(models: any) {
      Task.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Task.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
      Task.hasMany(models.Reminder, {
        foreignKey: 'task_id',
        as: 'reminders'
      });
    }
  }
  Task.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      status: { 
        type: DataTypes.ENUM('pending', 'in_progress', 'completed'), 
        defaultValue: 'pending',
        allowNull: false
      },
      priority: { 
        type: DataTypes.ENUM('low', 'medium', 'high'), 
        defaultValue: 'medium',
        allowNull: false
      },
      due_date: { type: DataTypes.DATE, allowNull: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      category_id: { type: DataTypes.INTEGER, allowNull: true }
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      timestamps: true,
      underscored: true
    }
  );
  return Task;
};
