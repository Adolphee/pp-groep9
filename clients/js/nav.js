$(document).ready(function () {
    $.ajax({
        url: "./general parts/nav.html"
    }).done(function (res) {
        $("#nav").html(res)
    });

$(document).on("change",'#navdrop',function (e) {

    $('#product').html('');
    console.log("change van select werkt");
    let value = e.target.value;
    let ajaxPath = "http://10.3.50.56:3009/api/"+value;
    $.ajax({
        url: ajaxPath,
        method: 'GET',
        dataType: 'json'
    }).done(function(data){
        console.log('DONE');
        console.log(data);
        // deleten van vorige items
        $('#catContainer').empty();

        for (let b of data)
        {

            //let img = new Image();
            let pathIMG= productImgCheck(b.product_id);
            // let urlimg = `../images/${b.product_id}.png`;
            // $.ajax({
            //     url:urlimg,
            //     method: 'GET',
            //     async: false
            //
            // }).done(function (e) {
            //     console.log("er is een img");
            //    pathIMG = b.product_id;
            //
            // }).fail(function (error) {
            //     console.log("geen img");
            //     pathIMG=-1;
            // });
            // img.onload = function(){
            //     console.log("img bestaat");
            //     pathIMG = b.product_id;
            //     console.log(pathIMG);
            // }
            //
            // img.onerror = function(){
            //     console.log("geen img");
            // }
            // img.src = url;


            $('#catContainer').append(`
            <div>
                <img src='../images/${pathIMG}.png'>
                <h3>${b.productnaam}</h3>
                <button id="${b.product_id}" class="btn primary center-btn view-product">View product</button>
            </div>`);
        }

    }).fail(function(er1, er2){
        console.log(er1);
        console.log(er2);
    });
});
});
