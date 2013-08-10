class TaskType < ActiveRecord::Base
   has_many :projects, :foreign_key => :default_task_type_id
   has_many :tasks
end
