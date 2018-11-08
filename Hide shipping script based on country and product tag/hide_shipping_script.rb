hide_Tag= 'HIDE_US_SHIPPING';

if Input.cart.shipping_address.country_code == 'US' && Input.cart.line_items.any?{|item| item.variant.product.tags.include? hide_Tag}
  Input.shipping_rates.delete_if do |shipping_rate|
      shipping_rate
  end
end

Output.shipping_rates = Input.shipping_rates
