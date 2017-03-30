$(() => {
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
});


function createFoodElement (food){
  var $sendFood =
    `<div  class="col-xs-6">
      <img class="img-responsive" src="${food.picture}">
      <b>${food.name}</b>, Price: ${food.price}
      <button class="btn">+1</button>
      <br>
      <span class="description">
      ${food.description}
      </span>

     </div>`
  return $sendFood;
}
