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
        $(document).on('input', '#search', (e) => {
            console.log("The value is: ",e.target.value);
            zoekNieuweWaarde(e.target.value);
        });
        $(document).on('click', 'body', (e) => {
            if (!e.target.classList.contains('view-product') && !(e.target.id == 'search')) {
                $('#prList').hide();
            }
        });
        $(document).on('focus', '#search', () => {
            $('#prList').show();
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
            url: `http://10.3.50.56:3009/api/search/${term}`
        }).done((producten) => {
            $('#prList').empty();
            $('#prList').css('visibility', 'visible');
            producten.forEach(product => {
                console.log(product);
                $('#prList').append(`
                    <p id="${product.product_id}" class="view-product bar">${product.productnaam}</p>
                `);
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
                <img src='../images/${productImgCheck(b.product_id)}.png'>
                <h3>${b.productnaam}</h3>
                <button id="${b.product_id}" class="btn primary center-btn view-product">View product</button>
            </div>`);
        }
    }).fail((err) => {
        console.log(err);
    });

$(document).on("change",'#navdrop',function (e) {
    $('#product').html('');
    $('#catContainer').show();
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
