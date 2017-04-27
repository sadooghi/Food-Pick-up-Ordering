
$('document').ready(function(){

  loadALL();

});



function loadALL() {
  $.ajax({
    method:"GET",
    url: "/restaurants/all"
  }).done((restaurants) => {
    console.log(restaurants);
    var $str = '';
    for(x in restaurants){
      $str+= createRestaurantElement(restaurants[x]);
    }
    document.getElementById("restaurants").insertAdjacentHTML('beforeend', $str);

    $(".img-responsive").click(function(){
      var restaurant_id = $(this).parent().find(".store-name").data("storeId");
      console.log(restaurant_id);
    });

  });
}


function createRestaurantElement (store){
  var $sendFood =
    `<div  class="col-xs-6 restdiv" id="store-logo" onClick="window.open('/restaurants/menu/all/${store.id}','_self')">
      <img class="img-responsive rest_pic" src="${store.picture}">

      <div class="store-name location" data-store-name="${store.name}" data-store-id="${store.id}"><b>${store.name}</b>
      ${store.food_type} Food <br>
      Located in: ${store.area},<br>
      ${store.location}
      </div>
     </div>`;
  return $sendFood;
}

function myFunction() {

    document.getElementById("myDropdown").classList.toggle("show");
}


function filterFood(filteredArea) {
  // Remove current list of restaurants
  // fetch new ones
  //apennd new ones to the DOM
  $.ajax({
      method:"GET",
      url: "/restaurants/location/" + filteredArea
    }).done((restaurants)=>{
      console.log("Retrieved these from the area: " + restaurants);
  });

}


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */


// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}




