class AddUnitConvertToHours < ActiveRecord::Migration
  def self.up
     add_column :estimate_units, :to_hours, :float

     cvt=1.1
     EstimateUnit.all.each do |u|
        u.to_hours=cvt
	u.save
	cvt=cvt+0.7
     end
  end

  def self.down
     remove_column :estimate_units, :to_hours
  end
end
