class AddPctComplete < ActiveRecord::Migration
  def self.up
     add_column :projects, :pct_complete, :integer
     add_column :tasks, :pct_complete, :integer

     Project.all.each do |p|
        p.pct_complete=0
	p.save
     end

     Task.all.each do |t|
        t.pct_complete=0
	t.save
     end
  end

  def self.down
     remove_column :projects, :pct_complete
     remove_column :tasks, :pct_complete
  end
end
