$(document).ready(() => {
    let product;
    let bestelregels= [];
    let globalItems = [];
    let selectCount;
    $(document).on("click", '.view-product', (e) => {
        $('#catContainer').hide();
        $('#carousel').hide();
        $('.about').hide();
        $('#bestelling').hide();
        $('#contactPage').hide();
        $('#map').hide();
        $('.sidenav').hide();
        $('#form').hide();
        $('#mapcontainer').hide();
        let id = e.target.id;
        let items = [];
        let done = false;

        if (e.target.classList.contains('bar')) {
            $('#prList').css('visibility', 'hidden');      
        }


        // Get product
        $.ajax({
            method:'GET',
            url:`http://10.3.50.56:3009/api/getProduct/${id}`
        }).done((res) => {
            product = res[0];
            // Get all free items off that specific product
            $.ajax({
                method:'GET',
                url:`http://10.3.50.56:3009/api/getFreeItems/${id}`
            }).done((res) => {
                items = res;
                let genomenItems = [];
                let mandje = JSON.parse(sessionStorage.getItem('cart'));
                console.log(mandje);
                if (mandje != null) {
                    // Alle item id's van het winkelmandje krijgen waar product id hetzelfde is
                    for (const item of mandje) {
                        if (item.product_id == product.product_id) {
                            genomenItems.push(item.item_id);
                        }
                    }
                    console.log(genomenItems);

                    items.forEach((item, i) => {
                        for (let j = 0; j < genomenItems.length; j++) {
                            if (item.item_id == genomenItems[j]) {
                                item.status = 'In gebruik';
                            }
                        }
                    });
                }
               
                globalItems = items;
                console.log(items);
                
                done = true;
                if (done) {
                    let pp = genProduct(id, product.productnaam, product.beschrijving, product.prijs, product.waarborg);
                    let aantal = '';
                    let count = 0;
                    $('#product').show();
                    $('#product').html(pp);

                    // Zet alle items in sessionStorage

                    // Tel ze allemaal
                    for (const item of items) {
                        if (item.status == "Vrij") {
                            count++;
                            aantal+= `<option value='${count}'>${count}</option>`;
                            console.log(count);
                        }

                    }
                    if (count != 0) {
                        selectCount=count;
                     $('#count').html(count);
                     $('#hoeveel').html(`<select id='aantalSelect' class="select"></select>`)
                     $('#aantalSelect').html(aantal);
                    } else {
                        $('#cartBtn').hide();
                        $('#count').html('0');
                    }
                }
            }).fail((err) => {
                console.log(err);
            });
        }).fail((err) => {
            console.log(err);
        });
    });

    $(document).on('click', '#back', () => {
        $('#product').hide();
        $('#catContainer').show();
        $('#carousel').show();
        $('.about').show();
        $('#bestelling').show();
        $('#contactPage').show();
        $('#map').show();
        $('.sidenav').show();
        $('#form').show();
        $('#mapcontainer').show();
    })

    // add item to cart
    $(document).on("click", ".addCart", (e) => {
        e.preventDefault();
        console.log('voeg toe aan winkelmandje');
        let itemID=[];
        let itemAlert='';
        let aantalAdd=$('#aantalSelect').val();

        //console.log(aantalAdd);
        let xVrij = 0;
        console.log(globalItems);
        
        // Check of er vrije items zijn
        for (const item of globalItems) {
            if (item.status == 'Vrij') {
                xVrij++;
            }
        }
        console.log("vrije items: " + xVrij);
        

        if (xVrij == 0) {
            $('body').append(`
                <div class="msg error">
                    <p>Helaas. Er zijn geen items meer beschikbaar.
                    <i class="fas fa-times msg-cross"></i>
                    </p>
                </div>
            `);
            $('.msg').css('visibility','visible');
            $('.msg').delay(2000).fadeOut();
        }
        else {
            for(let i=0;i<aantalAdd;i++)
            {
                let tellerRem=0;
            for (const item of globalItems) {

                let found = returnVrijItem(item);
                if (found != -1) {
                    itemID.push(found);
                    console.log(itemID[i]);
                }}

            
            // globale items aanpassen

            for (const item of globalItems) {

                if (item.item_id == itemID[i]) {
                    item.status = 'In gebruik';
                    console.log("werkt");
                }}

    
            if(xVrij!=0) {


                    product.item_id = itemID[i];
                    if (sessionStorage.getItem("cart") != null) {
                        let tempArray = JSON.parse(sessionStorage.getItem("cart"));
                        //console.log(tempArray[0]);
                        // bestelregels gelijk aan temp zetten
                        bestelregels = tempArray;
                        /*
                         bestelregels.push();*/
                    }

                    bestelregels.push(product);
                    sessionStorage.setItem('cart', JSON.stringify(bestelregels));
                    console.log(JSON.parse(sessionStorage.getItem("cart")));
                $(`#aantalSelect option[value='${xVrij}']`).remove();
                console.log(selectCount);
                selectCount--;
                $('#count').html(--xVrij);



            }

            if($('#aantalSelect').has('option').length ==0)
            {
                $('#aantalSelect').remove();
            }

            if(aantalAdd>1)
            {
               itemAlert +='s';

            }





                // Succes msg tonen
                $('body').append(`
                    <div class="msg success">
                        <p>Item${itemAlert} toegevoegd aan je winkelmandje.
                        <i class="fas fa-times msg-cross"></i>
                        </p>
                    </div>
                `);
                $('.msg').css('visibility', 'visible');
                $('.msg').delay(2000).fadeOut();
                itemAlert='';

            }
        }

    });

    $(document).on('click', '.msg-cross', () => {
        $('.msg').hide();
    })

    function returnVrijItem(item) {
        if (item.status === "Vrij") {
            return item.item_id;
        }
        else {
            return -1;
        }
    }


});