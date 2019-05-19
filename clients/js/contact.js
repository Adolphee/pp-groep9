<!-- Navigatiebalk -->
$(document).ready(() => {
    $.ajax({
        url: './general parts/nav.html'
    }).done((res) => {
        $("#nav").html(res)
    });

    <!-- Submit -->
    $('#submitform').click(function (e) {
        e.preventDefault();
        let data = $('form').serializeArray();
        console.log(data);
        $.ajax({
            url: "http://10.3.50.56:3009/api/contact/submitForm",
            data: data,
            method: 'post'
        }).done((res) => {
            console.log(res);
        })
    })
});

<!-- Naam Validatie -->

function Naam_Validatie() {
    let naam = document.createElement('input');
    let input= "input1".value;
}
    if (("input".length)>3) {
        document.getElementById('naam_validatie').innerText = "Correct!";
        document.getElementById('naam_validatie').style.color = '#7ed913';
}

<!-- E-mail Validatie -->
function Email_Validatie() {
    let email = document.createElement('input');
    email.type = 'email';
    email.value = document.getElementById('input2').value;

    if (email.checkValidity()) {
        document.getElementById('email_validation').innerText = "Correct!";
        document.getElementById('email_validation').style.color = '#7ed913';
    } else {
        document.getElementById('email_validation').innerText = "Fout! Het e-mailadress moet van de vorm: 'example@example.com' zijn";
        document.getElementById('email_validation').style.color = "#F20000";
    }
}