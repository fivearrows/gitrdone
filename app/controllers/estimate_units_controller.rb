class EstimateUnitsController < ApplicationController
  # GET /estimate_units
  # GET /estimate_units.xml
  def index
    @estimate_units = EstimateUnit.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @estimate_units }
    end
  end

  # GET /estimate_units/1
  # GET /estimate_units/1.xml
  def show
    @estimate_unit = EstimateUnit.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @estimate_unit }
    end
  end

  # GET /estimate_units/new
  # GET /estimate_units/new.xml
  def new
    @estimate_unit = EstimateUnit.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @estimate_unit }
    end
  end

  # GET /estimate_units/1/edit
  def edit
    @estimate_unit = EstimateUnit.find(params[:id])
  end

  # POST /estimate_units
  # POST /estimate_units.xml
  def create
    @estimate_unit = EstimateUnit.new(params[:estimate_unit])

    respond_to do |format|
      if @estimate_unit.save
        format.html { redirect_to(@estimate_unit, :notice => 'EstimateUnit was successfully created.') }
        format.xml  { render :xml => @estimate_unit, :status => :created, :location => @estimate_unit }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @estimate_unit.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /estimate_units/1
  # PUT /estimate_units/1.xml
  def update
    @estimate_unit = EstimateUnit.find(params[:id])

    respond_to do |format|
      if @estimate_unit.update_attributes(params[:estimate_unit])
        format.html { redirect_to(@estimate_unit, :notice => 'EstimateUnit was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @estimate_unit.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /estimate_units/1
  # DELETE /estimate_units/1.xml
  def destroy
    @estimate_unit = EstimateUnit.find(params[:id])
    @estimate_unit.destroy

    respond_to do |format|
      format.html { redirect_to(estimate_units_url) }
      format.xml  { head :ok }
    end
  end
end
