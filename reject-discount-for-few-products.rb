#Reject Discount for few products
reject = false
Input.cart.line_items.select do |line_item|
  product = line_item.variant.product
  if product.tags.include?('reject_code')
    reject = true
  end
end

if reject and Input.cart.discount_code
  Input.cart.discount_code.reject(
    message: "discount can't applied! for this product."
  )
end
Output.cart = Input.cart
