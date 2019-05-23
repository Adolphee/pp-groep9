$(document).ready(() => {
    // Navigatiebalk 
    $.ajax({
        url: './general parts/nav.html'
    }).done((res) => {
        $("#nav").html(res)
    });

    // Submit
    $('#submitform').click(function (e) {
        e.preventDefault();
        let data = $('form').serializeArray();
        let error = false;
        console.log(data);
        for (item of data) {
            if (item.name == "naam" && item.value == "") {
                $('#inputNaam').css('border-color', 'red');
                error = true;
            } else if (item.name == "naam" && item.value != "") {
                $('#inputNaam').css('border-color', '#7ed913');
            }
            if (item.name == "email" && item.value == "") {
                $('#inputEmail').css('border-color', 'red');
                error = true;
            } else if (item.name == "email" && item.value != "") {
                $('#inputEmail').css('border-color', '#7ed913');
            }
            if (item.name == "msg" && item.value == "") {
                $('#inputVraag').css('border-color', 'red');
                error = true;
            } else if (item.name == "msg" && item.value != "") {
                $('#inputVraag').css('border-color', '#7ed913');
            }
        }
        if (error) {
            $('body').append(`
            <div class="msg error">
                <p>Alle velden zijn verplicht
                <i class="fas fa-times msg-cross"></i>
                </p>
            </div>`);
            $('.msg').css('visibility', 'visible');
            $('.msg').delay(2000).slideUp();
        } else {
            $('.msg').css('visibility', 'visible');
            $('.msg').delay(2000).slideUp();
            $.ajax({
                url: "http://10.3.50.56:3009/contact/submitForm",
                data: data,
                method: 'POST'
            }).done((res) => {
                $('body').append(`
                <div class="msg success">
                    <p>${res.msg}
                    <i class="fas fa-times msg-cross"></i>
                    </p>
                </div>`);
                $('.msg').css('visibility', 'visible');
                $('.msg').delay(3000).slideUp();
                $('#inputNaam').val('');
                $('#inputEmail').val('');
                $('#inputVraag').val('');
            }).fail((err) => {
                console.log(err);
            })
        }
    })
});

