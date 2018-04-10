
<div class='loading_me'>
  <div class="img">
    <p>We're processing...</p>
  </div>
</div>
{{ '//ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min.js' | script_tag }}
<script type="text/javascript">
  window.simply = window.simply || {};
  window.cn = function(o){return"undefined"==typeof o||null==o||""==o.toString().trim()};
  window.cb = function(o){if(o == 'true'){return true}else{return false}};
      
  window.cart_data = [];
  window.codAppied = false;
  window.checkoutLineItem = [];
  $(".loading_me").appendTo('body');
  simply.shopDomain = "{{shop.domain}}";
  {%- for item in checkout.line_items -%}  
  var item  = {};
  item.id = '{{item.variant_id}}';
  item.quantity = '{{item.quantity}}';
  properties = {};
  {%- for pro in item.properties -%}
  {% if pro.last == 'cod' %}
  {%- assign cod = true -%}
  {% endif %}
  properties['{{pro.first}}'] = '{{pro.last}}';
  {%- endfor -%}
  item.properties = properties;
  window.cart_data.push(item);
  {%- endfor -%}
  var not_cod_input = $(".content-box__row:first input");
  var cod_input = $(".content-box__row[data-gateway-group='manual'] input");
  var disccount_banner = $(".section--payment-method .section__content");
  {%- if cod -%}
  cod_input.click();
  codAppied = true;
  disccount_banner.prepend("<p class='cod_banner'>{{settings.checkout_discount_before}}</p>");
  {%- else -%}
  disccount_banner.prepend("<p class='cod_banner'>{{settings.checkout_discount_after}}</p>");
  {%- endif -%}
</script>
{{ 'simply.checkout-script.js' | asset_url | script_tag }} 
