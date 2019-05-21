$(document).ready(() => {
    let product;
    let bestelregels= [];


    $(document).on("click", '.view-product', (e) => {
        $('#catContainer').hide();
        $('#carousel').hide();
        $('.about').hide();
        $('#bestelling').hide();
        $('#contactPage').hide();
        $('#map').hide();
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
                console.log(product.productnaam);
                console.log(items);
                done = true;
                if (done) {
                    let pp = genProduct(id, product.productnaam, product.beschrijving, product.prijs, product.waarborg);
                    let count = 0;
                    console.log(pp);
                    $('#product').show();
                    $('#product').html(pp);

                    // Tel ze allemaal
                    for (const item of items) {
                        count++;
                        console.log(count);
                        
                    }
                    if (count != 0) {
                        for (const item of items) {
                            $('#selectItem').append(`
                                <option value="${item.item_id}">Item ${item.item_id}</option>
                            `);
                        }
                    } else {
                        $('#selectItem').hide();
                        $('#cartBtn').hide();
                    }
                    $('#count').html(count);
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
    })

    // add item to cart
    $(document).on("click", ".addCart", (e) => {
        e.preventDefault();
        console.log('klik');
        let itemID = $("#selectItem option:selected").val();
        if(itemID!=0) {

            product.item_id = itemID;
            if (sessionStorage.getItem("cart") != null) {
                let tempArray = JSON.parse(sessionStorage.getItem("cart"));
                //console.log(tempArray[0]);
                // bestelregels gelijk aan temp zetten
                bestelregels = tempArray;
                /*
                 bestelregels.push();*/
            }

            bestelregels.push(product);
            // console.log(bestelregels);
            sessionStorage.setItem('cart', JSON.stringify(bestelregels));
            console.log(JSON.parse(sessionStorage.getItem("cart")));
            //console.log(JSON.parse(localStorage.getItem("cart")));
            //console.log(localStorage.getItem('cart'))

            


        }
    });


});