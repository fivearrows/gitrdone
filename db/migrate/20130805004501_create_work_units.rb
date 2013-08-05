class CreateWorkUnits < ActiveRecord::Migration
  def self.up
    create_table :work_units do |t|
      t.string :name
      t.number :hour_equivalent

      t.timestamps
    end

    add_column :tasks, :work_unit_id, :integer
    add_column :tasks, :actual, :number

    u=WorkUnit.new
    u.id=1
    u.name="Hour"
    u.hour_equivalent=1.0
    u.save

    u=WorkUnit.new
    u.name="Day"
    u.hour_equivalent=8.0
    u.save

    u=WorkUnit.new
    u.name="Week"
    u.hour_equivalent=40.0
    u.save

    u=WorkUnit.new
    u.name="RM"
    u.hour_equivalent=160.0
    u.save

    Task.all.each do |t|
       t.work_unit_id=1
       t.save
    end

  end

  def self.down
    drop_table :work_units
    remove_column :tasks, :work_unit_id
    remove_column :tasks, :actual
  end
end
