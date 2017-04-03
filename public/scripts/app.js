$(() => {
  var path = window.location.pathname
  var y = path.split('/')
  var restaurant_id = y[y.length-1]
  loadALL(restaurant_id);
});


function loadALL(restaurant_id) {

  $.ajax({
    method:"GET",
    url: "/restaurants/menu/api/"+restaurant_id
  }).done((foods)=>{
    console.log(foods);
    var outStr = '<div class="col-sm-8 container food"><div class="row menu-row">';
    var counter = 0;

    for(item of foods) {
      counter ++;
      outStr += createFoodElement(item);
      if(counter > 1) {
        counter = 0;
        outStr += '</div><div class="row menu-row">'
      }
    }
    outStr += '</div></div>';

    //STARTING CART COLUMN
    outStr += `<div class="col-sm-4 container cart" >
    <button class="btn" id="order-head">Start New Cart</button>
    <button class='btn place-order'>Order Now</button> <div id="cart-start"></div></div>`;


    $("<div class='row'>")
      .html(outStr)
      .appendTo($(".container"));

    $(".place-order").hide();

    $(".add-to-cart").click(function(){
      $(".place-order").show();
      var name = $(this).parent().find(".food-name");
      // console.log(name.text(), name.data("foodName"));
      console.log(`Found this food item: "${name.data("foodName")}" with id: ${name.data("foodId")}`);
      findCart(name.data("foodId"))
    });

    $("#order-head").click(function(){
      alert("You have started a new cart!");
      var cartItems = newCart();
    });

    $(".place-order").click(function(){
      alert("Your order is being completed!");
      placeOrder();
    });

  });
}

function newCart(){
  $.ajax({
    method:"POST",
    url: "../cart/" //REPLACE 1 WITH USER ID
  }).done(() => {
  });
}

function findCart(item){
   $.ajax({
    method:"POST",
    url: "../add/" + item,
    success: (cart_items) => {

      console.log(cart_items);
      var cartStr = "";
      for(i in cart_items){
        cartStr += createCartElement(cart_items[i]);
      }
      document.getElementById("cart-start").innerHTML = cartStr;
      }

  })/*.done((cart_items) => {
    console.log(cart_items);
    var cartStr = "";
    for(i in cart_items){
      cartStr += createCartElement(cart_items[i]);
    }
    document.getElementById("cart-start").innerHTML = cartStr;
  });*/
}

function createFoodElement (food){
  var $sendFood =
    `<div  class="col-xs-6">
      <img class="img-responsive" src="${food.picture}">
      <div class="food-name" data-food-name="${food.name}" data-food-id="${food.id}"><b>${food.name}</b></div> Price: ${food.price}
      <button class="btn add-to-cart">+1</button>
      <span class="description">
      ${food.description}
      </span>

     </div>`;
  return $sendFood;
}

function createCartElement (food){
  var $sendItem =
  `<div class="col-sm-12">
    <img class="img-responsive cart-pic" src="${food.picture}">
    <span class="food-name">${food.name}</span>
    <button class="btn incr">+1</button>
    <button class="btn decr">-1</button>

  </div>
  `;
  return $sendItem;
}

function placeOrder(){
  //FIRST AJAX CALL TO POST CART_ID/UID TO ORDERS
  $.ajax({
    method:"POST",
    url: "../order",
    data: {phone: 904}
  }).done((uid) => {
    //SECOND AJAX CALL GET A NEW CART_ID AND INSERT
    $.ajax({
      method:"POST",
      url:"../cart"
    });
  });
}




