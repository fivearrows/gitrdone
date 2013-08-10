class ProjectPhase < ActiveRecord::Base
  named_scope :inorder, :order => 'sequence'
  has_many :projects, :foreign_key => :current_phase_id
end
