$(document).ready(() => {
    let product;
    let bestelregels= [];


    $(document).on("click", '.view-product', (e) => {
        $('#catContainer').html('');
        let id = e.target.id;
        let items = [];
        let done = false;

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
                    $('#product').html(pp);
                    for (const item of items) {
                        $('#selectItem').append(`
                            <option value="${item.item_id}">Item ${item.item_id}</option>
                        `);
                        count++;
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