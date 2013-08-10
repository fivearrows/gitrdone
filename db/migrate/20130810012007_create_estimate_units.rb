class CreateEstimateUnits < ActiveRecord::Migration
  def self.up
    create_table :estimate_units do |t|
      t.string :name

      t.timestamps
    end

    u=EstimateUnit.new
    u.name="KSLOC"
    u.save

    u=EstimateUnit.new
    u.name="MM"
    u.save

    u=EstimateUnit.new
    u.name="Hours"
    u.save

    u=EstimateUnit.new
    u.name="Function Points"
    u.save

    u=EstimateUnit.new
    u.name="User Stories"
    u.save

    u=EstimateUnit.new
    u.name="Defects"
    u.save

  end

  def self.down
    drop_table :estimate_units
  end
end
