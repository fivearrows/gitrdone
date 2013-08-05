# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def self.all_models
    # must eager load all the classes...
    Dir.glob("#{RAILS_ROOT}/app/models/**/*.rb") do |model_path|
      begin
        require model_path
      rescue
        # ignore
      end
    end
    # simply return them
    tables = Array.new
    ActiveRecord::Base.connection.tables.each do |table|
      begin
        table.classify.constantize
	tables.push table
      rescue
        # if exception, not a model, don't add
      end
    end
    return tables
  end

end
