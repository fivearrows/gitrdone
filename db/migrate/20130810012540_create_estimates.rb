class CreateEstimates < ActiveRecord::Migration
  def self.up
    create_table :estimates do |t|
      t.integer :task_id
      t.integer :phase_id
      t.integer :estimate_unit_id
      t.float :qty

      t.timestamps
    end
  end

  def self.down
    drop_table :estimates
  end
end
