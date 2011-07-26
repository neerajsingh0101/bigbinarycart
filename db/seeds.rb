# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

s = %Q{
Stream movies, TV shows, music, photos, and more to the smaller, redesigned Apple TV. All you need is a single cable to set it up.
}

Product.create!(:name => 'Apple TV', :description => s, :price => 199.00, :category_id => Category.first)
