$(document).ready(function () {
    $.ajax({
        url: "./general parts/footer.html"
    }).done(function (res) {
        $("#footer").html(res);
    });

    let footerHeight, bottomPosFooter, topPosFooter;
    $.ajax({
        url: "./general parts/footer.html"
    }).done(function (res) {
        $("#footer").html(res);
        footerHeight = $('#footer').height();
        topPosFooter = $('#footer').offset().top;
        bottomPosFooter = footerHeight + topPosFooter;

        if (bottomPosFooter < $(window).height()) {
            console.log('drop footer');
            $('#footer').css('position', 'absolute');
            $('#footer').css('bottom', '0');
            $('#footer').css('width', '100%');
        }
    });

    $(document).on('click','#scroll',(e) => {
        e.preventDefault();
        $('html, body').animate({scrollTop : 0},500);
    });
});