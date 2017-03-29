$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    users = $.grep(users, function(param, index){
        return(param.description != undefined);
      });
    var outStr = '';
    for(user of users) {
      outStr += createFoodElement(user);
    }
      $("<div>").html(outStr).appendTo($("body"));
  });
});


function createFoodElement (food){
  var $sendFood =
    `<div>${food.name}, Price: ${food.price}
      <span> \nDescription: ${food.description} \n
      </span>
      <img src="${food.picture}">

     </div>`
  return $sendFood;
}
