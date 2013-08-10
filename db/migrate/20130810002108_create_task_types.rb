class CreateTaskTypes < ActiveRecord::Migration
  def self.up
    create_table :task_types do |t|
      t.string :name
      t.float :complexity_factor

      t.timestamps
    end

    t=TaskType.new
    t.name="Desktop Software"
    t.complexity_factor=1.0
    t.save

    t=TaskType.new
    t.name="Enterprise Software"
    t.complexity_factor=3.0
    t.save

    t=TaskType.new
    t.name="System Software"
    t.complexity_factor=2.0
    t.save

    t=TaskType.new
    t.name="Embedded Software"
    t.complexity_factor=10.0
    t.save
    
    add_column :projects, :default_task_type_id, :integer
    add_column :tasks, :task_type_id, :integer

  end

  def self.down
    drop_table :task_types
    remove_column :projects, :default_task_type_id
    remove_column :tasks, :task_type_id
  end
end
