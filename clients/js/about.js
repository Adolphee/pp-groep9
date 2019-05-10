$(document).ready(()=>{
   $.ajax({
       url: './general parts/nav.html'
   }).done((res)=>{
       $('#nav').html(res)
   })
});