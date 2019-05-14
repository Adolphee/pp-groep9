$(document).ready(() => {
    $(document).on("click", '.view-product', (e) => {
        $('#catContainer').html('');
        let id = e.target.id;
        let product;
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
                    let pp = genProduct(id, product.productnaam, product.beschrijving, items);
                    console.log(pp);
                    $('#product').html(pp);
                }
            }).fail((err) => {
                console.log(err);
            });
        }).fail((err) => {
            console.log(err);
        });
    });
});