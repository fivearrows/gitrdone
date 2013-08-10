class AddTaskDueDate < ActiveRecord::Migration
  def self.up
     add_column :tasks, :target_date, :date
     add_column :tasks, :due_date, :date
     add_column :tasks, :deadline, :date
  end

  def self.down
     remove_column :tasks, :target_date
     remove_column :tasks, :due_date
     remove_column :tasks, :deadline
  end
end
