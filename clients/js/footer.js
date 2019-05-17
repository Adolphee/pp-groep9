$(document).ready(function () {
    $.ajax({
        url: "./general parts/footer.html"
    }).done(function (res) {
        $("#footer").html(res);
    });
});