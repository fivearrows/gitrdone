class WorkUnitsController < ApplicationController
  # GET /work_units
  # GET /work_units.xml
  def index
    @work_units = WorkUnit.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @work_units }
    end
  end

  # GET /work_units/1
  # GET /work_units/1.xml
  def show
    @work_unit = WorkUnit.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @work_unit }
    end
  end

  # GET /work_units/new
  # GET /work_units/new.xml
  def new
    @work_unit = WorkUnit.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @work_unit }
    end
  end

  # GET /work_units/1/edit
  def edit
    @work_unit = WorkUnit.find(params[:id])
  end

  # POST /work_units
  # POST /work_units.xml
  def create
    @work_unit = WorkUnit.new(params[:work_unit])

    respond_to do |format|
      if @work_unit.save
        format.html { redirect_to(@work_unit, :notice => 'WorkUnit was successfully created.') }
        format.xml  { render :xml => @work_unit, :status => :created, :location => @work_unit }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @work_unit.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /work_units/1
  # PUT /work_units/1.xml
  def update
    @work_unit = WorkUnit.find(params[:id])

    respond_to do |format|
      if @work_unit.update_attributes(params[:work_unit])
        format.html { redirect_to(@work_unit, :notice => 'WorkUnit was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @work_unit.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /work_units/1
  # DELETE /work_units/1.xml
  def destroy
    @work_unit = WorkUnit.find(params[:id])
    @work_unit.destroy

    respond_to do |format|
      format.html { redirect_to(work_units_url) }
      format.xml  { head :ok }
    end
  end
end
