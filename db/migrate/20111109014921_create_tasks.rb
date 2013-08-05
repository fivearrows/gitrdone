class CreateTasks < ActiveRecord::Migration
  def self.up
    create_table :tasks do |t|
      t.string :name
      t.integer :project_id
      t.integer :parent_task_id
      t.boolean :active
      t.number :pct_complete
      t.boolean :complete
      t.integer :charge_number_id
      t.integer :owner_id

      t.timestamps
    end
  end

  def self.down
    drop_table :tasks
  end
end
