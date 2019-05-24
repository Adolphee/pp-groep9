$(document).ready(() => {
    $('#loadModal').hide();
    $('#m2').hide();
    $('#m2b').hide();
    $('#m3').hide();
    $('#m4').hide();
});

function datumOmkeer(datum){
    let temp = datum.split('-');
    return `${temp[2]}/${temp[1]}/${temp[0]}`;
}

$(document).on('click', '#reserveer',function(e) {
    e.preventDefault();
    console.log('linked');
    //default
    $('#loadModal').css('display', 'block');
    $('#loadModal').show();
    $('#m1').show();
    $('#m2').hide();
    $('#m2b').hide();
    $('#m3').hide();
    $('#m4').hide();

    $('#b1').show();
    $('#b2').hide();
    $('#2B').hide();
    $('#b3').hide();
    $('#b4').hide();

    //button progression
    $('#yes').click(function () {
        $('#m1').hide();
        $('#m2').show();
        $('#m2b').hide();
        $('#m3').hide();
        $('#m4').hide();

        $('#b1').hide();
        $('#b2').show();
        $('#2B').hide();
        $('#b3').hide();
        $('#b4').hide();
    });
    $('#no').click(function () {
        $('#m1').hide();
        $('#m2').hide();
        $('#m2b').show();
        $('#m3').hide();
        $('#m4').hide();

        $('#b1').hide();
        $('#b2').hide();
        $('#2B').show();
        $('#b3').hide();
        $('#b4').hide();
    });
    $('#confirm').click(function () {
        // Is klant id ingevuld of niet
        let kid = $('#kid').val();
        console.log('kid: ', kid);
        if (kid == undefined || kid == '') {
            console.log('geen geldig kid');
            $('.msg').css('visibility', 'visible');
            $('.msg').html('Klant id mag niet leeg zijn');
        } else {
            // Kijken of klant al bestaat
            $.ajax({
                method: 'GET',
                url: `http://10.3.50.56:3009/api/klanten/${kid}`
            }).done((res) => {
                console.log(res);
                if (res == '') {
                    console.log(res);
                    
                    console.log('id bestaat niet');
                    $('.msg').css('visibility', 'visible');
                    $('.msg').html('Klant id bestaat niet');
                }
                else {
                    $('.msg').css('visibility', 'hidden');
                    $('#m1').hide();
                    $('#m2').hide();
                    $('#m2b').hide();
                    $('#m3').show();
                    $('#m4').hide();
            
                    $('#b1').hide();
                    $('#b2').hide();
                    $('#2B').hide();
                    $('#b3').show();
                    $('#b4').hide();
                }
            })
        }
    });
    $('#register').click(function () {
        let voornaam = $('#voornaam').val();
        let naam = $('#naam').val();
        let date = $('#date').val();
        let land = $('#land').val();
        let stad = $('#stad').val();
        let zip = $('#zip').val();
        let straat = $('#straat').val();
        let huisnr = $('#huisnr').val();
        if ((voornaam == undefined || voornaam == '') || (naam == undefined || naam == '')||(date == undefined || date == '')||(land == undefined || land == '')||(stad == undefined || stad == '')||(zip == undefined || zip == '')||(straat == undefined || straat == '')||(huisnr == undefined || huisnr == '')) {
            console.log('Niet alle vielden zijn ingevuld');
            $('.msg').css('visibility', 'visible');
            $('.msg').html('Alle velden moeten ingevuld zijn');
        }else
            // Maak nieuwe klant
            {
                 let newKlant = {
                    voornaam: $('#voornaam').val(),
                    achternaam: $('#naam').val(),
                    geboortedatum: $('#date').val(),
                    land: $('#land').val(),
                    gemeente: $('#stad').val(),
                    postcode: $('#zip').val(),
                    straat: $('#straat').val(),
                    huisnummer: $('#huisnr').val(),
                    busnummer: $('#busnr').val()
                  }
                console.log(newKlant);
        
        // Doe ajax post naar insert/newKlant
        $.ajax({
            method: 'POST',
            url: 'http://10.3.50.56:3009/api/insert/newKlant',
            data: newKlant
        }).done((res) => {
            console.log(res);
            sessionStorage.setItem('klant', JSON.stringify(res));
        }).fail((err) => {
            console.log(err);
        })
        
        $('#m1').hide();
        $('#m2').hide();
        $('#m2b').hide();
        $('#m3').show();
        $('#m4').hide();

                // Doe ajax post naar insert/newKlant
                $.ajax({
                    method: 'POST',
                    url: 'http://10.3.50.56:3009/api/insert/newKlant',
                    data: newKlant
                }).done((res) => {
                    console.log(res);
                    sessionStorage.setItem('klant', JSON.stringify(res));
                }).fail((err) => {
                    console.log(err);
                })

                $('#m1').hide();
                $('#m2').hide();
                $('#m2b').hide();
                $('#m3').show();
                $('#m4').hide();

                $('#b1').hide();
                $('#b2').hide();
                $('#2B').hide();
                $('#b3').show();
                $('#b4').hide();
            }
    });
    $('#save').click(function (e) {
        let klantId = document.getElementById("kid").value;
        console.log(klantId);
        
        if (klantId === undefined || klantId === "") {
            let klant = JSON.parse(sessionStorage.getItem('klant'));
            if (klant == null) {
                //e.preventDefault();
                let form = document.getElementById("kid");
                let label = document.createElement("label");
                label.appendChild(document.createTextNode("Ongeldige klantId. Probeer opnieuw!"));
                console.log('well null');
                form.appendChild(label);
            } else {
                klantId = klant.klantId;
                console.log('niet null');
                
            }
        }

        let startDatum = $('#start').val();
        let eindDatum = $('#eind').val();
        if ((startDatum == undefined || startDatum == '') || (eindDatum == undefined || eindDatum == '')|| (eindDatum < startDatum)){

            console.log('Vul beide data');
            $('.msg').css('visibility', 'visible');
            $('.msg').html('Beide data moeten ingevuld zijn en einddatum moet groter zijn dan startdatum');
        } else {


             startDatum = datumOmkeer(document.getElementById("start").value);
             eindDatum = datumOmkeer(document.getElementById("eind").value);
            let items = JSON.parse(sessionStorage.getItem('cart'));
            console.log("cart items: ", items);

            //TODO: use this IP --> 10.3.50.56
            $.ajax({
                method: 'GET',
                url: `http://10.3.50.56:3009/api/klanten/${klantId}`
            }).done((klant) => {
                console.log(klant);
                console.log({
                    uitleendatum: startDatum,
                    einddatum: eindDatum,
                    klant_id: klant.klant_id,
                    lev_adres_id: klant.klant_adres_id
                });
                $.ajax({
                    method: 'POST',
                    url: `http://10.3.50.56:3009/api/bestellingen`,
                    data: {
                        uitleendatum: startDatum,
                        einddatum: eindDatum,
                        klant_id: klant.klant_id,
                        lev_adres_id: klant.klant_adres_id
                    }
                }).done((bestelling) => {
                    console.log(bestelling);
                    items.forEach((item) => {
                        $.ajax({
                            method: 'POST',
                            url: `http://10.3.50.56:3009/api/bestellingen/bestelregels`,
                            data: {
                                itemId: item.item_id,
                                bestelId: bestelling.bestelling_id
                            }
                        }).done((bestelregel) => {
                            console.log(bestelregel);
                            sessionStorage.removeItem('cart'); // Shoppingcart leegmaken
                            sessionStorage.removeItem('klant');
                            klantId = undefined;
                        }).fail((err) => {
                            console.log(err);
                        });
                    });
                }).fail((err) => {
                    console.log(err);
                });


                $('#m1').hide();
                $('#m2').hide();
                $('#m2b').hide();
                $('#m3').hide();
                $('#m4').show();

                $('#b1').hide();
                $('#b2').hide();
                $('#2B').hide();
                $('#b3').hide();
                $('#b4').show();
            });
        }
    });
    // close the modal
    $('#thanks').click(function () {
     $("input").val("");
     $("date").val("");
        console.log('test');
        $('#loadModal').css('display', 'none');
        location.reload(); // om te tonen dat shipping car leeg is nu
    });
    $('span').click(function (){
        console.log('test');
        $('#loadModal').css('display', 'none');
        $('.msg').css('visibility', 'hidden');
    });
});
