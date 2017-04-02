
$('document').ready(function(){

  loadALL();

});



function loadALL() {
  function myFunction() {
      document.getElementById("myDropdown").classList.toggle("show");
  }
  function filterFood(filteredArea) {
  // Remove current list of restaurants
  // fetch new ones
  //apennd new ones to the DOM
$.ajax({
    method:"GET",
    url: "/restaurants/" + filteredArea
  }).done((restaurants)=>{

  })


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

  $.ajax({
    method:"GET",
    url: "/restaurants"
  }).done((restaurants)=>{
    document.getElementById("dButton").onclick = function() {myFunction()};
  })

}


