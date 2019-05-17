$(document).ready(function(){
   console.log('linked');
   //default
    $('#m1').show();
    $('#m2').hide();
    $('#m2b').hide();
    $('#m3').hide();
    $('#m4').hide();

    $('#b1').show();
    $('#b2').hide();
    $('#2B').hide();
    $('#b3').hide();
    $('#b4').hide();

    //button progression
    $('#yes').click(function(){
        $('#m1').hide();
        $('#m2').show() ;
        $('#m2b').hide();
        $('#m3').hide();
        $('#m4').hide();

        $('#b1').hide();
        $('#b2').show();
        $('#2B').hide();
        $('#b3').hide();
        $('#b4').hide();
    });
    $('#no').click(function(){
        $('#m1').hide();
        $('#m2').hide() ;
        $('#m2b').show();
        $('#m3').hide();
        $('#m4').hide();

        $('#b1').hide();
        $('#b2').hide();
        $('#2B').show();
        $('#b3').hide();
        $('#b4').hide();
    });
    $('#confirm').click(function(){
        $('#m1').hide();
        $('#m2').hide() ;
        $('#m2b').hide();
        $('#m3').show();
        $('#m4').hide();

        $('#b1').hide();
        $('#b2').hide();
        $('#2B').hide();
        $('#b3').show();
        $('#b4').hide();
    });
    $('#register').click(function(){
        $('#m1').hide();
        $('#m2').hide() ;
        $('#m2b').hide();
        $('#m3').show();
        $('#m4').hide();

        $('#b1').hide();
        $('#b2').hide();
        $('#2B').hide();
        $('#b3').show();
        $('#b4').hide();
    });
    $('#save').click(function(){
        $('#m1').hide();
        $('#m2').hide() ;
        $('#m2b').hide();
        $('#m3').hide();
        $('#m4').show();

        $('#b1').hide();
        $('#b2').hide();
        $('#2B').hide();
        $('#b3').hide();
        $('#b4').show();
    });

    // close the modal


    $('#thanks').click(function(){
        console.log('test');
        $('.modal').css('display', 'none');
    });
    $('span').click(function(){
        console.log('test');

        $('.modal').css('display', 'none');
    });
    //werkt niet
    $('window').click(function(){
        console.log('test');
        $('.modal').css('display', 'none');
    });

});

