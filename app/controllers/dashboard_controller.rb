class DashboardController < ApplicationController
  layout 'dashboards' 
  helper 'application'

  def index
     @projects=Project.find(:all)
  end

  def status
  end

  def maintenance
    @models=ApplicationHelper.all_models
  end

end
