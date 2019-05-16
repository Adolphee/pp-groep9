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

/*E-mail validatie*/
function validate_email() {
    let input = document.createElement('input');
    input.type = 'email';
    input.value = document.getElementById('input2').value;

    if (input.checkValidity()) {
        document.getElementById('email_validation').innerText = "Correct!";
        document.getElementById('email_validation').style.color = '#7ed913';
        return true;
    }
}