class ProjectPhase < ActiveRecord::Base
  named_scope :inorder, :order => 'sequence'
end
