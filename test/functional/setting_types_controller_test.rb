require 'test_helper'

class SettingTypesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:setting_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create setting_type" do
    assert_difference('SettingType.count') do
      post :create, :setting_type => { }
    end

    assert_redirected_to setting_type_path(assigns(:setting_type))
  end

  test "should show setting_type" do
    get :show, :id => setting_types(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => setting_types(:one).to_param
    assert_response :success
  end

  test "should update setting_type" do
    put :update, :id => setting_types(:one).to_param, :setting_type => { }
    assert_redirected_to setting_type_path(assigns(:setting_type))
  end

  test "should destroy setting_type" do
    assert_difference('SettingType.count', -1) do
      delete :destroy, :id => setting_types(:one).to_param
    end

    assert_redirected_to setting_types_path
  end
end
