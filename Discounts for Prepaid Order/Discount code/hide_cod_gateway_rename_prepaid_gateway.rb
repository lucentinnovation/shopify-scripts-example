# create discount code PREPAID with 10%
Input.payment_gateways.each do |payment_gateway|
  if payment_gateway.name == "Cash on Delivery (COD)"
  else 
    payment_gateway.change_name(payment_gateway.name + " \n (Use coupon code 'PREPAID' for 10% off on this payment method)");
  end 
end

Output.payment_gateways = Input.payment_gateways.delete_if do |payment_gateway|
  payment_gateway.name == "Cash on Delivery (COD)" && Input.cart.discount_code && Input.cart.discount_code.code == "PREPAID"
end
