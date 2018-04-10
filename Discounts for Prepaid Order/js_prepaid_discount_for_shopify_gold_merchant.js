/**
 * @license
 * Copyright 2017 Lucent Innovation. All Rights Reserved.
 * you can use this code as required.
 * Try to give credit to Lucent Innovation Team and Shopify who inspire us to write such code
 * You can ask Lucent Innovation for any help on website lucentinnovation.com or email shopify@lucentinnovation.com
 * =============================================================================
 */
 
window.simply = window.simply || {};
      window.cn = function(o){return"undefined"==typeof o||null==o||""==o.toString().trim()};
      window.cb = function(o){if(o == 'true'){return true}else{return false}};
      
simply.ajaxCart =  function(form,callback){
  var data = form.serialize();
  var params = {
    type: 'POST',
    url: '/cart/add.js',
    data: data,
    dataType: 'json',
    success: function(line_item) { 
      callback();
    },
    error: function(XMLHttpRequest, textStatus) {
      var error=  JSON.parse((XMLHttpRequest.responseText)).description;
      var error_popup = $("<div id='quick_error'></div>");
      error_popup.html("");
      error_popup.append("<h6>"+error+"</h6>");
      console.log(error_popup);
      button.text(button.attr("data-text"));
    }
  };
  jQuery.ajax(params);
};
simply.ajaxCartRemove =  function(id,callback){
  var data = {updates: {id: id,quantity:0}};
  var params = {
    type: 'POST',
    url: '/cart/update.js',
    data: "updates["+id+"]=0",
    dataType: 'json',
    success: function(line_item) { 
      callback();
    },
    error: function(XMLHttpRequest, textStatus) {
      var error=  JSON.parse((XMLHttpRequest.responseText)).description;
      var error_popup = $("<div id='quick_error'></div>");
      error_popup.html("");
      error_popup.append("<h6>"+error+"</h6>");
      console.log(error_popup);
      button.text(button.attr("data-text"));
    }
  };
  jQuery.ajax(params);
};

simply.showLoading = function(){
  $("body").addClass('overflow_hidden');
  $("html").addClass('overflow_hidden');
  $(".loading_me").fadeIn();
};
simply.hideLoading = function(){
  $("body").removeClass('overflow_hidden');
  $("html").removeClass('overflow_hidden');
  $(".loading_me").hide();
};
simply.cartProcess = function(callback){
  if(cart_data.length > 0){
    var item = cart_data.pop();
    var form = $("<form>");
    var id = $("<input type='hidden' value='"+item.id+"' name='id'>");
    var qty = $("<input type='hidden' value='"+item.quantity+"' name='quantity'>");
    var prop = item.properties;
    var prop_input;
    for(var key in prop){
      if(key != 'cod'){
        prop_input =  $("<input type='hidden' value='"+prop[key]+"' name='properties["+key+"]'>");
        form.append(prop_input);
      }
    }

    form.append(id);
    form.append(qty);
    scs.ajaxCart(form,simply.cartProcess);
  }
  else{
    callback();
  }
};
simply.goCheckout = function(){
  window.location.href = '/checkout';
};
simply.removeWithoutCodProduct = function(){
  simply.ajaxCartRemove(withoutCodProduct,simply.goCheckout);
};
simply.addWithoutCodProduct = function(){
  var form = $("<form>");
  var id = $("<input name='id' value='"+withoutCodProduct+"'>");
  form.append(id);
  simply.ajaxCart(form,simply.goCheckout);
};
simply.clickEvent = function(){
  $(".content-box__row[data-gateway-group != 'manual'] input").click(function(){
    debugger;
    if(codAppied){
      simply.showLoading();
      if(hasCart){
        simply.addWithoutCodProduct();
      }
      else{
        simply.cartProcess(simply.addWithoutCodProduct);
      }
    }
  });
  cod_input.click(function(){
    debugger;
    if(codAppied){}
    else{
      simply.showLoading();
      if(hasCart){
        simply.showLoading();
        simply.removeWithoutCodProduct();
      }
      else
      {
        simply.cartProcess(simply.removeWithoutCodProduct);
      }
    }
  });
};
simply.hoverEvent = function(){};
simply.changeEvent = function(){};
simply.submitEvent = function(){};

simply.init = function(){
  simply.clickEvent();
  simply.hoverEvent();
  simply.changeEvent();
  simply.submitEvent();
};
$(document).ready(function(){
  simply.init();
});
