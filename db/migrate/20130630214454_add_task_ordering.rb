class AddTaskOrdering < ActiveRecord::Migration
  def self.up
    add_column :tasks, :sequence, :integer
  end

  def self.down
    remove_column :tasks, :sequence
  end
end
