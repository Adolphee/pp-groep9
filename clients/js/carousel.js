$(document).ready(function(){
    let slideIndex = 1;
    showDivs(slideIndex);

    function plusDivs(n) {
        showDivs(slideIndex += n);
    }
    $(document).on('click',"#leftbtn",function(){
       plusDivs(-1);
    });
    $(document).on('click',"#rightbtn",function(){
       plusDivs(+1);
    });

    function showDivs(n) {
        let i;
        let x = $(".carousel");
        if (n > x.length) {slideIndex = 1}
        if (n < 1) {slideIndex = x.length}
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        x[slideIndex-1].style.display = "block";
    }
});


