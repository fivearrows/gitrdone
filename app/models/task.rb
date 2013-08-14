class Task < ActiveRecord::Base
  belongs_to :project
  belongs_to :owner, :class_name=>'Person'
  belongs_to :parent_task, :class_name => 'Task', :foreign_key => :parent_task_id
  belongs_to :work_unit
  has_many :subtasks, :class_name => 'Task', :foreign_key => 'parent_task_id',
     :order => 'sequence'
  has_many :estimates

  attr_accessor :new_estimate_unit_id
  @new_estimate_unit_id
  attr_accessor :new_estimate_qty
  @new_estimate_qty

  after_save :update_estimate

  def update_estimate
    if new_estimate_unit_id || new_estimate_qty
      e=current_estimate
      if !e
        e=Estimate.new
	e.task_id=id
	e.project_phase_id=project.current_phase_id
	e.qty=0
	e.estimate_unit_id=1
      end
      if new_estimate_qty
        e.qty=new_estimate_qty
      end
      if new_estimate_unit_id
        e.estimate_unit_id=new_estimate_unit_id
      end

      e.save
      
    end
  end

  named_scope :toplevel, :conditions => {:parent_task_id => nil},
     :order => 'sequence'

  def current_estimate
     Estimate.find(:first, 
        :conditions => {:task_id => id, :project_phase_id => project.current_phase_id})
  end

  def estimate_unit
    current_estimate ? current_estimate.estimate_unit : nil
  end

  def estimate_unit_id
    current_estimate ? current_estimate.estimate_unit.id : nil
  end

  def estimate_qty
    current_estimate ? current_estimate.qty : nil
  end

  def estimate_txt
     txt="-"
     if estimate_unit_id && estimate_qty
        txt=(estimate_unit.to_hours * estimate_qty).to_s + " hours"
     end
     return txt
  end

  def estimate_qty=(newval)
     self.new_estimate_qty=newval
  end

  def estimate_unit=(newval)
     self.new_estimate_unit_id=newval.id
  end

  def estimate_unit_id=(newval)
     self.new_estimate_unit_id=newval
  end

end
