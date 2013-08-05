class CreateSettingTypes < ActiveRecord::Migration
  def self.up
    create_table :setting_types do |t|
      t.string :name
      t.boolean :set_string
      t.boolean :set_boolean
      t.boolean :set_integer

      t.timestamps
    end
    
    st = SettingType.new
    st.id = 1
    st.name="String"
    st.set_string=true
    st.set_boolean=false
    st.set_integer=false
    st.save

    st = SettingType.new
    st.id = 2
    st.name="Boolean"
    st.set_string=false
    st.set_boolean=true
    st.set_integer=false
    st.save

    st = SettingType.new
    st.id = 3
    st.name="Integer"
    st.set_string=false
    st.set_boolean=false
    st.set_integer=true
    st.save
   
  end

  def self.down
    drop_table :setting_types
  end
end
