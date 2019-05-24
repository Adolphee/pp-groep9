$(document).ready(function() {
    $.ajax({
        url: "./general parts/nav.html"
    }).done(function (res) {
        $("#nav").html(res)
    });

    $("#bestellingenLijst").hide();
    $("#logout").click(() => {
        sessionStorage.removeItem('klant');
        hideProfilePage();
    });

    if (sessionStorage.getItem('klant') !== null) { //todo:check of de klantgegevens kloppen
        displayProfilePage();
        $("#logout").show();
    } else {
        hideProfilePage();
    }

    $(function () {
        if (sessionStorage.getItem('klant') !== null) { //todo:check of de klantgegevens kloppen
            displayProfilePage();
        } else {
            hideProfilePage();
        }
    });

    $('#register').click(function () {
        // Maak nieuwe klant
        let newKlant = {
            voornaam: document.getElementById('voornaam').value,
            achternaam: document.getElementById('naam').value,
            geboortedatum: datumOmkeer(document.getElementById('date').value),
            land: document.getElementById('land').value,
            gemeente: document.getElementById('stad').value,
            postcode: document.getElementById('zip').value,
            straat: document.getElementById('straat').value,
            huisnummer: document.getElementById('huisnr').value,
            busnummer: document.getElementById('busnr').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
        $.ajax({
            type: 'POST',
            url: 'http://10.3.50.56:3009/api/insert/newKlantWithLogin',
            data: newKlant
        }).done((res) => {
            let klant = res.data.klant;
            console.log(klant);
            sessionStorage.setItem('klant', JSON.stringify(klant));
            if (sessionStorage.getItem('klant') !== null) { //todo:check of de klantgegevens kloppen

            } else {
                alert("User not stored in session ...");
            }
        }).fail((err) => {
            console.log('foutje.......');
            console.log(err);
            // TODO: Zeg de gebruiker dat hij fout is
        });
    });

    $("#sidenav").css({
        display: "block"
    });

    $("#inlogknop").click(function () {
        // Zoek klant
        let inlogKlant = {
            username: document.getElementById('inlogveld').value,
            password: document.getElementById('wwveld').value,
        };
        $.ajax({
            type: 'POST',
            url: 'http://10.3.50.56:3009/api/auth',
            data: inlogKlant
        }).done((res) => {//TODO: geraakt ni in
            sessionStorage.setItem('klant', JSON.stringify(res));
            console.log(JSON.stringify(res));
            location.reload();
            // todo: show profile page
            if (sessionStorage.getItem('klant') !== null) { //todo:check of de klantgegevens kloppen
                displayProfilePage();
                $("#logout").show();
            } else {
                alert("User not stored in session ...");
            }
        }).fail((err) => {
            // TODO: Zeg de gebruiker dat hij fout is

        });
    });
    $("#mijnprofieldiv").hide();
    $("#mijnprofiel").click(function () {
        $("#mijnprofieldiv").show();
        $("#bestellingenLijst").hide();
        let klant = JSON.parse(sessionStorage.getItem('klant'));

        $("#vnaam").html(klant.voornaam);
        $("#fnaam").html(klant.achternaam);
        $("#gdatum").html(klant.geboortedatum);
        $("#pstraat").html(klant.straatnaam);
        $("#phuisnr").html(klant.huisnummer);
        $("#pbusnr").html(klant.busnummer);
        $("#pcode").html(klant.postcode);
        $("#pstad").html(klant.gemeente);
        $("#pland").html(klant.land);
    });

    $("#bestellingen").click(function () {
        displayProfilePage();
        $("#mijnprofieldiv").hide();
        // Dit kan enkel aangeroepen worden wanneer de user is ingelogd en de session dus gevuld vor 'klant'
        // Een check om te zien of essionStorage.getItem('klant') == null -is niet nodig
        let klant_id = JSON.parse(sessionStorage.getItem('klant')).klant_id;
        $.ajax({
            method: "GET",
            url: `http://10.3.50.56:3009/api/klant/${klant_id}/bestellingen`
        }).done(function (bestellingen) {
            bestellingen.forEach((bestelling) => {
                let date1 = bestelling.einddatum.split("/");
                let einde = new Date();
                einde.setFullYear(parseInt(date1[2]), parseInt(date1[1]), parseInt(date1[0]));
                let isVoorbij = einde.getTime() < new Date().getTime();
                let readOnlyAttribute = 'readonly="readonly"';
                let editknop = `<button id="${bestelling.bestelling_id}" class="editknop2">Save</button>`;
                let listElement = `<div class="card">
                        <h3>Bestelling ID: ${bestelling.bestelling_id}</h3>
                        <p>Uitleendatum: ${bestelling.uitleendatum}</p>
                        <p>Einddatum: <input type="text" ${isVoorbij ? readOnlyAttribute : ""} value="${bestelling.einddatum}"></p>
                        ${!isVoorbij ? editknop : ""}
                    </div>`;
                let listElementAsNode = $.parseHTML(listElement);
                $("#bList").append(listElementAsNode);
                $("#bestellingenLijst").show();
            });
        });
    });
    $("button.editknop2").click(() => {
        let bestelling_id = parseInt(this.id);
        $.ajax({
            method: "GET",
            url: `http://10.3.50.56:3009/api/bestellingen/${bestelling_id}`
        }).done(function (bestelling) {
            console.log("Ajax 1 klaar... moving on");
            $.ajax({
                method: "PUT",
                url: `http://10.3.50.56:3009/api/bestellingen/${bestelling_id}`,
                data: bestelling
            }).done(function (resp) {
                console.log("Datum update done");
            });
        });
    });
});


function displayProfilePage() {
    $("#left").hide();
    $("#right").hide();
    $(".login-form").css("display", "none");
    $(".form").css("display", "none");
    $(".login-page").css("display", "none");
    $('#sidenav').css("display", "block");
}

function hideProfilePage() {
    $("#left").show();
    $("#right").show();
    $("#bestellingenLijst").hide();
    $("#mijnprofieldiv").hide();
    $(".login-form").css("display", "block");
    $(".form").css("display", "block");
    $(".login-page").css("display", "block");
    $('#sidenav').hide();
}