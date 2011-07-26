class Product < ActiveRecord::Base
  validates_presence_of :name, :description, :price
  
  has_attached_file :picture, :styles => { :original => ["420x420#", :jpg], :thumbnail => ["190x190#", :jpg] }

  scope :active, where(:active => true)

end
