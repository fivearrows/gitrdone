class RenameEstimatePhase < ActiveRecord::Migration
  def self.up
     add_column :estimates, :project_phase_id, :integer
     Estimate.all.each do |e|
        e.project_phase_id=e.phase_id
	e.save
     end
     remove_column :estimates, :phase_id
  end

  def self.down
     add_column :estimates, :phase_id, :integer
     Estimate.all.each do |e|
        e.phase_id=e.project_phase_id
	e.save
     end
     remove_column :estimates, :project_phase_id
  end
end
