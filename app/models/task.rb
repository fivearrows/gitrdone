class Task < ActiveRecord::Base
  belongs_to :project
  belongs_to :owner, :class_name=>'Person'
  belongs_to :parent_task, :class_name => 'Task', :foreign_key => :parent_task_id
  belongs_to :work_unit
  has_many :subtasks, :class_name => 'Task', :foreign_key => 'parent_task_id',
     :order => 'sequence'

  named_scope :toplevel, :conditions => {:parent_task_id => nil},
     :order => 'sequence'
end
