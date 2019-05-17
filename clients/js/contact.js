<!-- Navigatiebalk -->
$(document).ready(() => {
    $.ajax({
        url: './general parts/nav.html'
    }).done((res) => {
        $("#nav").html(res)
    })
});

/*Als je op "Naam", "E-mailaddres" of "Vraag/Klacht?" klikt zal de cursor automatisch in het invulveld terecht komt*/
document.getElementById("ondertitel1").onclick = function () {
    document.getElementById("input1").select();
};

document.getElementById("ondertitel2").onclick = function () {
    document.getElementById("input2").select();
};

document.getElementById("ondertitel3").onclick = function () {
    document.getElementById("input3").select();
};
