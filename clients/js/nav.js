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
            $('#catContainer').append(`
            <div>
                <img src='../images/${b.product_id}.png'>
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
