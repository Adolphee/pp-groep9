$(document).ready(() => {
    $('#loadModal').hide();
    $('#m2').hide();
    $('#m2b').hide();
    $('#m3').hide();
    $('#m4').hide();
});

function datumOmkeer(datum){
    let temp = datum.split('/');
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
    });
    $('#register').click(function () {
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
    });
    $('#save').click(function (e) {
        let klantId = document.getElementById("kid").value;

        if (klantId === undefined || klantId === "") {
            //e.preventDefault();
            let form = document.getElementById("kid");
            let label = document.createElement("label");
            label.appendChild(document.createTextNode("Ongeldige klantId. Probeer opnieuw!"));
            form.appendChild(label);
        }

        let startDatum = datumOmkeer(document.getElementById("start").value);
        let eindDatum = datumOmkeer(document.getElementById("eind").value);
        let items = JSON.parse(sessionStorage.getItem('cart'));
        console.log("cart items: ", items);

        //TODO: use this IP --> 10.3.50.56
        $.ajax({
            method: 'GET',
            url: `http://localhost:3009/api/klanten/${klantId}`
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
                url: `http://localhost:3009/api/bestellingen`,
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
                        url: `http://localhost:3009/api/bestellingen/bestelregels`,
                        data: {
                            itemId: item.item_id,
                            bestelId: bestelling.bestelling_id
                        }
                    }).done((bestelregel) => {
                        console.log(bestelregel);
                        sessionStorage.removeItem('cart');
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

        // close the modal
        $('#thanks').click(function () {
            console.log('test');
            $('#loadModal').css('display', 'none');
            location.reload(); // om te tonen dat shipping car leeg is nu
        });
        $('span').click(function () {
            console.log('test');
            $('#loadModal').css('display', 'none');
        });
    });
});
