class Estimate < ActiveRecord::Base
   belongs_to :estimate_unit
   belongs_to :task
   belongs_to :project_phase
end
