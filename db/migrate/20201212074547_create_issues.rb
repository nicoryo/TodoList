class CreateIssues < ActiveRecord::Migration[6.0]
  def change
    create_table :issues do |t|
      t.text :name

      t.timestamps
    end
  end
end
