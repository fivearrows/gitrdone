require 'test_helper'

class ProjectPhasesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:project_phases)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create project_phase" do
    assert_difference('ProjectPhase.count') do
      post :create, :project_phase => { }
    end

    assert_redirected_to project_phase_path(assigns(:project_phase))
  end

  test "should show project_phase" do
    get :show, :id => project_phases(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => project_phases(:one).to_param
    assert_response :success
  end

  test "should update project_phase" do
    put :update, :id => project_phases(:one).to_param, :project_phase => { }
    assert_redirected_to project_phase_path(assigns(:project_phase))
  end

  test "should destroy project_phase" do
    assert_difference('ProjectPhase.count', -1) do
      delete :destroy, :id => project_phases(:one).to_param
    end

    assert_redirected_to project_phases_path
  end
end
