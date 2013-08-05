class Person < ActiveRecord::Base
  has_many :projects, :foreign_key => 'owner_id'

  named_scope :byname, :order => 'last_name, first_name'

  def full_name
    last_name+", "+first_name
  end
end
