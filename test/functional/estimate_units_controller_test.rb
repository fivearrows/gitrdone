require 'test_helper'

class EstimateUnitsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:estimate_units)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create estimate_unit" do
    assert_difference('EstimateUnit.count') do
      post :create, :estimate_unit => { }
    end

    assert_redirected_to estimate_unit_path(assigns(:estimate_unit))
  end

  test "should show estimate_unit" do
    get :show, :id => estimate_units(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => estimate_units(:one).to_param
    assert_response :success
  end

  test "should update estimate_unit" do
    put :update, :id => estimate_units(:one).to_param, :estimate_unit => { }
    assert_redirected_to estimate_unit_path(assigns(:estimate_unit))
  end

  test "should destroy estimate_unit" do
    assert_difference('EstimateUnit.count', -1) do
      delete :destroy, :id => estimate_units(:one).to_param
    end

    assert_redirected_to estimate_units_path
  end
end
