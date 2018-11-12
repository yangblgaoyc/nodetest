$('document').ready(function(){
    $('#ajax_submit').on('click', function(evt){
        evt.preventDefault();
        var action = $('.form-horizontal').attr('action');
        var $container = $('.formContainer');
        $.ajax({
            url: action,
            type: 'POST',
            success: function(data){
                if(data.success){
                    $container.html('<h2>Thank you!</h2>');
                }
                else{
                    $container.html('There was a problem.');
                }
            },
            error: function(){
                $container.html('There was a problem.');
            }
        });
    });
});