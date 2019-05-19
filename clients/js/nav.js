$(document).ready(function () {
    $.ajax({
        url: "./general parts/nav.html"
    }).done(function (res) {
        $("#nav").html(res)
        if (!window.location.pathname.includes('index')) {
            console.log('remove dropdown');
            $('#catDrop').hide();
        }
    });

    $(function(){
        $("#search").keyup(function () {
            console.log("The value is:",this.value);
            zoekNieuweWaarde(this.value);
        });
        $("#search").blur(function () {
            document.getElementById('json-datalist').innerHTML = "";
        });
    });

    function zoekNieuweWaarde(term) {
        if (term.length==0) {
            let search = $("#livesearch");
            search.innerHTML="";
            return;
        }
        $.ajax({
            method: 'GET',
            url: `http://localhost:3009/api/search/${term}`
        }).done((producten) => {
            let dataList = document.getElementById('json-datalist');
            dataList.innerHTML = "";
            producten.forEach((product) => {
                let option = document.createElement('option');
                option.value = product.productnaam;
                option.id = product.product_id;
                dataList.appendChild(option);
            });
        }).fail((err) => {
            console.log(err);
        });
    }

    // Laad alle producten
    $.ajax({
        method:'GET',
        url:`http://10.3.50.56:3009/api/getAllProducts/`,
        dataType: 'json'
    }).done((res) => {
        $('#catContainer').empty();
        for (let b of res)
        {
            $('#catContainer').append(`
            <div>
                <img src='../images/${b.product_id}.png'>
                <h3>${b.productnaam}</h3>
                <button id="${b.product_id}" class="btn primary center-btn view-product">View product</button>
            </div>`);
        }
    }).fail((err) => {
        console.log(err);
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
                <img src='../images/${productImgCheck(b.product_id)}.png'>
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
