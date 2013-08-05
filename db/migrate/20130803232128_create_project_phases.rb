class CreateProjectPhases < ActiveRecord::Migration
  def self.up
    create_table :project_phases do |t|
      t.string :name
      t.string :short_name
      t.integer :sequence

      t.timestamps
    end

    add_column :projects, :current_phase_id, :integer

    p=ProjectPhase.new
    p.name='Proposal'
    p.short_name='Proposal'
    p.sequence=1
    p.id=1
    p.save

    p=ProjectPhase.new
    p.name='Definition'
    p.short_name='Definition'
    p.sequence=2
    p.id=2
    p.save

    p=ProjectPhase.new
    p.name='Design'
    p.short_name='Design'
    p.sequence=3
    p.id=3
    p.save

    p=ProjectPhase.new
    p.name='Implementation'
    p.short_name='Implementation'
    p.sequence=4
    p.id=4
    p.save

    p=ProjectPhase.new
    p.name='Verification'
    p.short_name='Verification'
    p.sequence=5
    p.id=5
    p.save

    p=ProjectPhase.new
    p.name='Release'
    p.short_name='Release'
    p.sequence=6
    p.id=6
    p.save

    p=ProjectPhase.new
    p.name='Fielded'
    p.short_name='Fielded'
    p.sequence=7
    p.id=7
    p.save

  end

  def self.down
    drop_table :project_phases
    remove_column :projects, :current_phase_id
  end
end
