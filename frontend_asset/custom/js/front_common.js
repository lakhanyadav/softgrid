$(document).ready(function(){

    //Bootstrap tooltip initialize
    $('[data-toggle="tooltip"]').tooltip();

    function show_loader(){
        $('#tl_front_loader').show();
    }

    function hide_loader(){
        $('#tl_front_loader').hide();
    }

    /* Common messages */
    var proceed_err = 'Please fill required fields before proceeding.',
    err_unknown = 'Something went wrong. Please try again.';

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "5000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    //user can not enter alphabet and first digit is dot
    $('.floatValue').keypress(function(event) {
        if (this.value.length == 0 && event.which == 48 ){//first character zero not allow
            return false;
        }
        if (((event.which != 46 || (event.which == 46 && $(this).val() == '')) ||
            $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    }).on('paste', function(event) {
        event.preventDefault();
    });//End

    jQuery.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
    }, "Numbers and special characters are not allowed."); 

    jQuery.validator.addMethod("email", function(value, element) {
     return this.optional( element ) || ( /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/.test( value ) && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/.test( value ) );
    }, 'Please enter valid email address.');

    jQuery.validator.addMethod("specialChars", function( value, element ) {
        var regex = new RegExp("^[a-zA-Z0-9]+$");
        var key = String.fromCharCode(event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
           event.preventDefault();
           return false;
        }
    }, "please use only alphanumeric or alphabetic characters");

    jQuery.validator.addMethod('passwordSame', function(value, element) {

        // The two password inputs
        var newpassword = $("#new_Password").val();
        var oldPassword = $("#old_Password").val();
        // Check for equality with the password inputs
        if(newpassword == oldPassword ){
            return false;
        }else{
            return true;
        }
    });

    jQuery.validator.addMethod('budgetMinCheck', function(value, element) {
        // The two password inputs
        var budgetMinCheck = Number($("#job_budget").val());
        
        if(budgetMinCheck < 2){
            return false;
        }else{
            return true;
        }
    });

    jQuery.validator.addMethod('offerMinCheck', function(value, element) {
        
        var min_rate = Number($("#minPrice").val());
        var job_offer = Number($("#job_budget").val());
        if(job_offer < min_rate){
            return false;
        }else{
            return true;
        }
    });

    jQuery.validator.addMethod('CheckInputValue', function(value, element) {
        // The two password inputs
        var value = $("#no_of_days").val();
        if(value == 0){
            return false;
        }else{
            return true;
        }
    });

    jQuery.validator.addMethod('passwordCheck', function(value, element) {
        
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();

        if(password == confirmPassword){
            return true;
        }else{
            return false;
        }
    });

    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    //Add product
    var add_product = $("#addProduct");  
    add_product.validate({ 
        rules: {
            productName: {
                required: true,
            },
            productImage: {
                required: true, 
            },
            price: {
                required: true, 
                number: true   
            },
            color: {
                required: true,
            },
            size: {
                required: true,  
            }, 
            qty: {
                required: true,  
            },
            brand: {
                required: true,   
            }                
        },
        
    }); //End 

    /*** add product here ***/
    $('body').on('click', ".add_product", function (event) {
        
        if(add_product.valid() !== true){
            toastr.error(proceed_err); return false;
        }
        
        var _that = $(this), 
        form = _that.closest('form'),      
        formData = new FormData(form[0]),
        f_action = form.attr('action');

        $.ajax({
            type: "POST",
            url: f_action,
            data: formData, //only input
            processData: false,
            contentType: false,
            dataType: "JSON", 
            beforeSend: function () { 
                show_loader(); 
            },
            success: function (data, textStatus, jqXHR) {  
                hide_loader();        
                if (data.status == 1){ 
                    toastr.success(data.msg);
                    window.setTimeout(function () {
                        window.location.href = base_url+"home/ProductList";
                    }, 500);

                }else {
                    toastr.error(data.msg);      
                } 
                setTimeout(function() {
                    $(".alert").hide(1000);
                }, 4000);
            },
            error:function (){
                toastr.error('Failed! Please try again');
            }
        });  
    }); //End

});// End DOM