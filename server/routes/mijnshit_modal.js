$('#save').click(function (e) {
    let klantId = document.getElementById("kid").value;
    console.log(klantId);
    
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
                    sessionStorage.removeItem('cart');
                }).fail((err) => {
                    console.log(err);
                });
            });
        }).fail((err) => {
            console.log(err);
        });
        /* --> Jarno
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
        */
    });

});