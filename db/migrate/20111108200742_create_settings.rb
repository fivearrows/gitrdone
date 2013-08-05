class CreateSettings < ActiveRecord::Migration
  def self.up
    create_table :settings do |t|
      t.string :name
      t.integer :setting_type_id
      t.string :string_value
      t.boolean :boolean_value
      t.integer :integer_value

      t.timestamps
    end
  end

  def self.down
    drop_table :settings
  end
end
