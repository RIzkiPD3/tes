import { Model, DataTypes, Sequelize } from 'sequelize';

interface ReminderAttributes {
  id?: number;
  title: string;
  message?: string;
  reminder_time: Date;
  is_sent: boolean;
  user_id: number;
  task_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

interface ReminderCreationAttributes extends Omit<ReminderAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
  class Reminder extends Model<ReminderAttributes, ReminderCreationAttributes> {
    static associate(models: any) {
      Reminder.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Reminder.belongsTo(models.Task, { foreignKey: 'task_id', as: 'task' });
    }
  }
  
  Reminder.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      message: { type: DataTypes.TEXT, allowNull: true },
      reminder_time: { type: DataTypes.DATE, allowNull: false },
      is_sent: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      task_id: { type: DataTypes.INTEGER, allowNull: true }
    },
    {
      sequelize,
      modelName: 'Reminder',
      tableName: 'reminders',
      timestamps: true,
      underscored: true,
    }
  );
  
  return Reminder;
};
  