// lucentinnovation 

customer = Input.cart.customer
productIdArray = Array.new
qty = 0
discount = true;
Input.cart.line_items.each do |line_item|
   if line_item.properties['cod'] == 'cod'
    discount = false
  end
   
 end
puts discount
 if  discount
Input.cart.line_items.each do |line_item|
   product = line_item.variant.product
    percent = Decimal.new(90) / 100.0;
    remaing_amount  = line_item.line_price * percent 
    line_item.change_line_price(remaing_amount , message: "10% off on all items.")
  end
end


Output.cart = Input.cart
