class Project < ActiveRecord::Base
   belongs_to :owner, :class_name=>'Person'
   belongs_to :current_phase, :class_name=>'ProjectPhase'
   has_many :tasks

   before_save :on_save

   def on_save
      if current_phase_id_changed?
         print "current phase changed!"
	 if current_phase_id_was > current_phase_id
	    print "going backward in time???"
	 end
      end
   end
end
