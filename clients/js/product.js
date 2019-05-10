$(document).ready(()=>{
    $.ajax({
        url: './general parts/nav.html'
    }).done((res)=>{
        console.log("werkt");
        $('#nav').html(res);
    })
});