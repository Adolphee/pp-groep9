$(document).ready(function(){
    console.log("linked");
    $.ajax({
        url: "./general parts/nav.html"
    }).done(function(res){
       $("#nav").html(res)
    })
});