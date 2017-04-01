$(() => {
  /*
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    users = $.grep(users, function(param, index){
        return(param.description != undefined);
      });
    var outStr = '<div class="col-sm-8 container food"><div class="row">';
    var counter = 0;
    for(user of users) {
      counter ++;
      outStr += createFoodElement(user);
      if(counter > 1) {
        counter = 0;
        outStr += '</div><div class="row">'
      }
    }
    outStr+= '</div></div>';
    $("<div class='row'>").html(outStr).appendTo($("div"));
  });
  $("<div class='row'>").html(outStr).appendTo($("div"));

      $(".add-to-cart").click(function(){
        var name = $(this).parent().find(".food-name");
        console.log(name.text(), name.data("foodNsame"));
      });
    });
  });*/
  loadALL();
});


function loadALL() {
  $.ajax({
    method:"GET",
    url: "/menu/"
  }).done((food)=>{

    var outStr = '<div class="col-sm-8 container food"><div class="row menu-row">';
    var counter = 0;
    for(item of food) {
      counter ++;
      outStr += createFoodElement(item);
      if(counter > 1) {
        counter = 0;
        outStr += '</div><div class="row menu-row">'
      }
    }
    outStr += '</div></div>';

    //STARTING CART COLUMN
    outStr += `<div class="col-sm-4 container cart" id="cart-start">
    <button class="btn" id="order-head">Start New Cart</button>
    <button class='btn place-order'>Order Now</button> </div>`;


    $("<div class='row'>")
      .html(outStr)
      .appendTo($("div"));

    $(".place-order").hide();

    $(".add-to-cart").click(function(){
      $(".place-order").show();
      var name = $(this).parent().find(".food-name");
      // console.log(name.text(), name.data("foodName"));
      console.log(`Found this food item: "${name.data("foodName")}" with id: ${name.data("foodId")}`);
      findCart(name.data("foodId"))
    });

    $("#order-head").click(function(){
      var cartItems = newCart(1738);
    });

    $(".place-order").click(function(){
      placeOrder(1738);
    });

  });
}

function newCart(user_id){
  $.ajax({
    method:"POST",
    url: "/menu/" + user_id + "/cart" //REPLACE 1 WITH USER ID
  }).done(() => {
  });
}

function findCart(item){
   $.ajax({
    method:"POST",
    url: "/menu/" + item
  }).done((cart_items) => {
    console.log(cart_items);
    var $cartStr = "";
    for(i in cart_items){
      $cartStr += createCartElement(cart_items[i]);
    }
    document.getElementById("cart-start").insertAdjacentHTML('beforeend', $cartStr);
  });
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

function placeOrder(user_id){
  //FIRST AJAX CALL TO POST CART_ID/UID TO ORDERS
  $.ajax({
    method:"POST",
    url: "/menu/" + user_id + "/order",
    data: {phone: 904}
  }).done((uid) => {
    //SECOND AJAX CALL GET A NEW CART_ID AND INSERT
    $.ajax({
      method:"POST",
      url:"/menu/" + uid +"/cart"
    });
  });
}




