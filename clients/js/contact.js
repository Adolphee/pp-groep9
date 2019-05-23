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
        console.log(data);
        $.ajax({
            url: "http://10.3.50.56:3009/contact/submitForm",
            data: data,
            method: 'post'
        }).done((res) => {
            console.log(res);
        })
    })
});

