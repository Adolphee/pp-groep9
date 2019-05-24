$(document).ready(function(){
    console.log("linked");
    $.ajax({
        url: "./general parts/nav.html"
    }).done(function(res){
        $("#nav").html(res)
    });

    $(function(){
        $("#sidenav").css({
            display: "none"
        });
    });

    $('#register').click(function () {
        // Maak nieuwe klant
        let newKlant = {
            voornaam: document.getElementById('voornaam').value,
            achternaam: document.getElementById('naam').value,
            geboortedatum: document.getElementById('date').value,
            land: document.getElementById('land').value,
            gemeente: document.getElementById('stad').value,
            postcode: document.getElementById('zip').value,
            straat: document.getElementById('straat').value,
            huisnummer: document.getElementById('huisnr').value,
            busnummer: document.getElementById('busnr').value,
            username: document.getElementById('busnr').value,
            busnummer: document.getElementById('busnr').value
        };
        // Doe ajax post naar insert/newKlant
        $.ajax({
            method: 'POST',
            url: 'http://localhost:3009/api/insert/newKlant',
            data: newKlant,
        }).done(function(res){
            console.log(res); // we willen die toch nie aanmaken zeker...
        }).fail((err) => {
            console.log(err);
        });

        sessionStorage.setItem('klant', JSON.stringify(newKlant));
        console.log(sessionStorage);

        console.log("skipped ajax");
    });

    $("#sidenav").css({
        display: "block"
    });


});