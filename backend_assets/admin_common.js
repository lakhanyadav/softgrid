  
    var base_url = $('#tl_admin_main_body').attr('data-base-url');

    function show_loader(){
        $('#tl_admin_loader').show();
    }

    function hide_loader(){
        $('#tl_admin_loader').hide();
    }

    function home(){
        window.location.href = base_url+"admin/dashboard" ;
    }

    var proceed_err = 'Please fill all fields properly.';

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    jQuery.extend(jQuery.validator.messages, {
        required: "This field is required.",
        remote: "This email already exists.",
        email: "Please enter valid Email.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid Date.",
        dateISO: "Please enter a valid Date (ISO).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid Credit Card Number.",
        equalTo: "Please enter the same value as Password.",
        passwordSame: "Old and New Password are same",
        accept: "Please enter a value with a valid extension.",
        maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
        minlength: jQuery.validator.format("Please enter at least {0} characters."),
        rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
        range: jQuery.validator.format("Please enter a value between {0} and {1}."),
        max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
        min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
    });    

    jQuery.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
    }, "Numbers and special characters are not allowed."); 

    jQuery.validator.addMethod("email", function(value, element) {
     return this.optional( element ) || ( /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/.test( value ) && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/.test( value ) );
    }, 'Please enter valid email address.');

    jQuery.validator.addMethod("notEqual", function(value, element, param) {
    return this.optional(element) || value != $(param).val();
    }, "This has to be different...");

    jQuery.validator.addMethod('passwordSame', function(value, element) {
        
        // The two password inputs
        var newpassword = $("#newPassword").val();
        var oldPassword = $("#password").val();

        // Check for equality with the password inputs
        if (newpassword == oldPassword ) {
            return false;
        } else {
            return true;
        }
    });




    // Add cateogry 
    $('body').on('click', ".add_category", function (event){  
    //Add product
    var add_category = $("#add_category");  
    add_category.validate({ 
        rules: {
            category: {
                required: true,
            },  
        },  
    }); //End 

        if(add_category.valid() !== true){
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
                         window.location.href = base_url+"admin/Category";
                    }, 500);

                }else if(data.status == -1){
                    toastr.error(data.msg);
                    window.setTimeout(function () {
                         window.location.href = base_url+"admin";
                    }, 500);

                }else {
                    toastr.error(data.msg);      
                } 
                setTimeout(function() {
                    $(".alert").hide(1000);
                }, 4000);
            },
            error:function (){
                /*toastr.error('Failed! Please try again');*/
            }
        });
    });
    // End

    $('body').on('click', "#add_category_popup", function (event) {
        $.ajax({
            url: base_url + 'admin/Category/add_category_popup',
            beforeSend: function(){
                show_loader();
            },
            success: function(data, textStatus, jqXHR){
                hide_loader();
                $('#getCategoryPopUp').html(data);
                $("#form-modal-box").modal('show');
            }
        });

    });

   



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
            unit: {
                required: true,
            },
            quantity: {
                required: true,
                number: true,   
            }, 
            description: {
                required: true,   
            }                 
        },
        
    }); //End 

    /*** add product here ***/
    $('body').on('click', ".add_product", function (event) {

        if(add_product.valid() !== true){
            toastr.error(proceed_err); return false;
        }
        if (add_product.valid()){ 
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
                             window.location.href = base_url+"admin/product/productList";
                        }, 500);

                    }else if(data.status == -1){
                        toastr.error(data.msg);
                        window.setTimeout(function () {
                             window.location.href = base_url+"admin";
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
        }else{ 
            // toastr.error('Failed! Please try again');
        }
    }); //End


    /*** Update admin email here ***/
    $('body').on('click', ".admin_email", function (event) {  
        // Check form validation
        var adminEmail = $("#adminEmail");  
        adminEmail.validate({ 
            rules: {
                email: {
                    required: true,
                    email: true,
                }                  
            },    
        }); //End 
        if(adminEmail.valid() !== true){
            toastr.error(proceed_err); return false;
        }
        if(adminEmail.valid()){ 
            var email = $("#email").val();
            $.ajax({
                url: base_url + 'admin/adminprofile/updateAdminEmail',
                type: 'POST',
                data:{'email':email},
                beforeSend: function () { 
                     show_loader(); 
                },
                success: function (response) {  
                    hide_loader(); 
                    var data = JSON.parse(response);       
                    if(data.status == 1){ 
                        toastr.success(data.msg);
                        window.setTimeout(function () {
                             window.location.href = base_url+"admin/adminprofile";
                        }, 500);

                    }else if(data.status == -1){
                        toastr.error(data.msg);
                        window.setTimeout(function () {
                             window.location.href = base_url+"admin";
                        }, 500);

                    }else{
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
        }else{ 
            toastr.error('Failed! Please try again');
        }
    });// End

    /*** Update admin password here ***/
    $('body').on('click', ".admin_changePassword", function (event) {
        var adminChangePassword = $("#adminChangePassword"); //update password validation  
        adminChangePassword.validate({ 
            rules: { 
                password: {
                    required: true,
                    minlength: 6,    
                },
                newPassword: {
                    required: true,
                    minlength: 6,
                    passwordSame:true, 
                },
                confirmPassword:{
                    required: true,
                    minlength: 6,
                    equalTo: '#newPassword'
                }                
            },
            messages:{
                confirmPassword : {
                    equalTo:"Please enter the same value as New Password."
                },
            }       
        }); //End update password validation

        if(adminChangePassword.valid() !== true){
            toastr.error(proceed_err); return false;
        }
        if(adminChangePassword.valid()){ 
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
                             window.location.href = base_url+"admin";
                        }, 500);

                    }else if(data.status == -1){
                        toastr.error(data.msg);
                        window.setTimeout(function () {
                             window.location.href = base_url+"admin";
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
        }else{ 
            toastr.error('Failed! Please try again');
        }
    });// End


    /** start script in application **/
    var logout = function () {
        
        bootbox.confirm('Are you sure want to logout?', function (isTrue) {
            var link =  base_url+'admin/logout';
            if (isTrue) {
                $.ajax({
                    url:link,
                    type: 'POST',
                    dataType: "JSON",
                    success: function (data) {
                        console.log(123);
                        window.location.href = base_url+"admin/";
                    }
                });
            }
        });
    }

    // show property details
    var showProperty = function(id){

        $.ajax({
            url: base_url + 'admin/Users/properDetail',
            type: 'POST',
            data:{'propertyId':id},
            beforeSend: function(){
                show_loader();
            },
            success: function(data, textStatus, jqXHR){
                hide_loader();
                $('#form-property-box').html(data);
                $("#propertyModal").modal('show');
            }
        });
    } // End

    // Show parcel details
    var showParcel = function(id){

        $.ajax({
            url: base_url + 'admin/Users/parcelDetail',
            type: 'POST',
            data:{'parcelId':id},
            beforeSend: function(){
                show_loader();
            },
            success: function(data, textStatus, jqXHR){
                hide_loader();
                $('#form-parcel-box').html(data);
                $("#parcelModal").modal('show');
            }
        });
       
    }// End

    // Show animal details
    var showAnimal = function(id){
       $.ajax({
            url: base_url + 'admin/Users/animalDetail',
            type: 'POST',
            data:{'animalId':id},
            beforeSend: function(){
                show_loader();
            },
            success: function(data, textStatus, jqXHR){
                hide_loader();
                $('#form-animal-box').html(data);
                $("#animalModal").modal('show');
            }
        });
    }//End

    // Show crop details
    var showCrop = function(id){
       $.ajax({
            url: base_url + 'admin/Users/cropDetail',
            type: 'POST',
            data:{'cropId':id},
            beforeSend: function(){
                show_loader();
            },
            success: function(data, textStatus, jqXHR){
                hide_loader();
                $('#form-crop-box').html(data);
                $("#cropModal").modal('show');
            }
       });
    }// End

    // Show dashboard property detail
    var showMyproperty = function(id){

        $.ajax({
            url: base_url + 'admin/Property/propertyDetail',
            type: 'POST',
            data:{'propertyId':id},
            beforeSend: function(){
                show_loader();
            },
            success: function(data, textStatus, jqXHR){
                hide_loader();
                $('#form-myproperty-box').html(data);
                $("#mypropertyModal").modal('show');
            }
        });

    }// End

    var showExpence = function(expenceId,type){

       $.ajax({
            url: base_url + 'admin/Users/expenceDetail',
            type: 'POST',
            data:{'expenceId':expenceId,'type':type},
            beforeSend: function(){
                show_loader();
            },
            success: function(data, textStatus, jqXHR){
                hide_loader();
                $('#form-myexpence-box').html(data);
                $("#myexpenseModal").modal('show');
            }
       });
    }


    //view model 
    var viewFn = function (ctrl, method, id) {
        $.ajax({
            url: base_url + ctrl + "/" + method,
            type: 'POST',
            data: {'id': id},
            beforeSend: function () {
                show_loader();
            },
            success: function (data, textStatus, jqXHR) {
                 hide_loader();
                $('#form-modal-box').html(data);
                $("#commonModal").modal('show');
                // addFormBoot();
               
            }
        });
    }//end view model
    
    var editfn = function(id){
        //alert(id);return false;
        $.ajax({
            url: base_url + 'admin/Category/editCategory',
            type: 'POST',
            data:{'categoryId':id},
            beforeSend: function(){
               show_loader();
            },
            success: function(data, textStatus, jqXHR){
                hide_loader();
               $('#editCat').html(data);
                $("#form-modal-edit").modal('show');
            }
        });
    }

    //Delete product 
    function deletefn(id){

        bootbox.confirm({
            message: "Do you want to delete this product?",
            buttons: {
                confirm: {
                    label: 'Ok',
                    className: 'v'
                },
                cancel: {
                    label: 'Cancel',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if(result){
                    $.ajax({
                        url: base_url + 'admin/Category/deleteCategory',
                        type: 'POST',
                        data:{'categoryId':id},
                        beforeSend: function () { 
                             show_loader(); 
                        },
                        success: function (response) {  
                            hide_loader(); 
                            var data = JSON.parse(response);       
                            if (data.status == 1){ 
                                toastr.success(data.msg);
                                window.setTimeout(function () {
                                     window.location.href = base_url+"admin/Category";
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
                }
            }
        });
    }// End
    
    // Active and Inactive users
    var statusFn = function (table, field, id, status) {
       
        var message = "";
        if (status == 1) {
            message = "inactive";
        } else if (status == 0) {
            message = "active";
        }

        bootbox.confirm({
            message: "Do you want to " + message + " this record?",
            buttons: {
                confirm: {
                    label: 'Ok',
                    className: 'v'
                },
                cancel: {
                    label: 'Cancel',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result) {
                    var url = base_url+"admin/Users/activeInactive";
                    $.ajax({
                        method: "POST",
                        url: url,
                        data: {id: id, id_name: field, table: table, status: status},
                        beforeSend: function () { 
                            show_loader(); 
                        },
                        success: function (response) {
                             hide_loader(); 
                            var data = JSON.parse(response);
                                  
                            if (data.status == 1) {
                                window.location.reload();
                            }else{

                                window.location.reload();
                            }
                        },
                        error: function (error, ror, r) {
                            bootbox.alert(error);
                        },
                    });
                }
            }
        });
    }// End  

    jQuery('body').on('change', '.input_img2', function () {

        var file_name = jQuery(this).val(),
            fileObj = this.files[0],
            calculatedSize = fileObj.size / (1024 * 1024),
            split_extension = file_name.substr( (file_name.lastIndexOf('.') +1) ).toLowerCase(), //this assumes that string will end with ext
            ext = ["jpg", "png", "jpeg"];
            console.log(split_extension+'---'+file_name.split("."));
        if (jQuery.inArray(split_extension, ext) == -1){
            $(this).val(fileObj.value = null);
            $('.ceo_file_error').html('Invalid file format. Allowed formats: jpg, jpeg, png');
            return false;
        }
        
        if (calculatedSize > 5){
            $(this).val(fileObj.value = null);
            $('.ceo_file_error').html('File size should not be greater than 5MB');
            return false;
        }
        if (jQuery.inArray(split_extension, ext) != -1 && calculatedSize < 10){
            $('.ceo_file_error').html('');
            readURL(this);
        }
    });

    jQuery('body').on('change', '.input_img3', function () {

        var file_name = jQuery(this).val(),
            fileObj = this.files[0],
            calculatedSize = fileObj.size / (1024 * 1024),
            split_extension = file_name.substr( (file_name.lastIndexOf('.') +1) ).toLowerCase(), //this assumes that string will end with ext
            ext = ["jpg", "png", "jpeg"];
        if (jQuery.inArray(split_extension, ext) == -1){
            $(this).val(fileObj.value = null);
            $('.ceo_file_error').html('Invalid file format. Allowed formats: jpg,jpeg,png');
            return false;
        }
        if (calculatedSize > 5){
            $(this).val(fileObj.value = null);
            $('.ceo_file_error').html('File size should not be greater than 5MB');
            return false;
        }
        if (jQuery.inArray(split_extension, ext) != -1 && calculatedSize < 10){
            $('.ceo_file_error').html('');
            readURL(this);
        }
    });

    function readURL(input) {
        var cur = input;
        if (cur.files && cur.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $(cur).hide();
                $(cur).next('span:first').hide();
                $(cur).next().next('img').attr('src', e.target.result);
                $(cur).next().next('img').css("display", "block");
                $(cur).next().next().next('span').attr('style', "");
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    jQuery('body').on('click', '.remove_img', function () {
        var img = jQuery(this).prev()[0];
        var span = jQuery(this).prev().prev()[0];
        var input = jQuery(this).prev().prev().prev()[0];
        jQuery(img).attr('src', '').css("display", "none");
        jQuery(span).css("display", "block");
        jQuery(input).css("display", "inline-block");
        jQuery(this).css("display", "none");
        jQuery(".image_hide").css("display", "block");
        jQuery("#user_image").val("");
    });

    var dataTable = $('#common_datatable_users');    
    if(dataTable.length !== 0){
        $('#common_datatable_users').dataTable({
            /*columnDefs: [{orderable: false, targets: [4, 6, 7]}]*/
            "pageLength": 10
        });
    }

    //common class for onkeypress validatenumber call
    $('body').on('keypress','.number_only',validateNumbers);
    /*To validate number only*/
    function validateNumbers(event) {
      if (event.keyCode == 46){
        return false;
      }
      var key = window.event ? event.keyCode : event.which;
      if (event.keyCode == 9 || event.keyCode == 8 || event.keyCode == 46) {
          return true; //allow only number key and period key
      }
      else if ( (key < 48 || key > 57) && key != 190 ) {
          return false;
      }
      else return true;
    };

$(function (){
    //validation for update crop
        var searchAnimal = $("#searchAnimal");  
        searchAnimal.validate({ 
            rules: {
                dateApplied: {
                    required: true,
                },
                animalOrCropId: {
                    required: true,
                }
                     
            }, 
            
        });// End 

     $('body').on('click', ".search_for_animal", function (event) {

        if(searchAnimal.valid() !== true){
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
                  $("#typeOneExpence").text(addCommas(data.total_expenses));
                  $("#typeOneSale").text(addCommas(data.sale));
                    
                }else if(data.status == -1){
                    toastr.error(data.msg);
                    window.setTimeout(function () {
                        window.location.href = data.url ;
                    }, 1000);
                }else {
                    $("#typeOneExpence").text(data.total_expenses);
                    $("#typeOneSale").text(data.sale);
                } 
                setTimeout(function() {
                    $(".alert").hide(1000);
                }, 4000);   
            }               
        });

     });

     //validation for update crop
        var searchCrop = $("#searchCrop");  
        searchCrop.validate({ 
            rules: {
                dateApplied: {
                    required: true,
                },
                animalOrCropId: {
                    required: true,
                }
                     
            }, 
            
        });// End 


     $('body').on('click', ".search_for_crop", function (event) {

        if(searchCrop.valid() !== true){
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
                  $("#typeTwoExpence").text(addCommas(data.total_expenses));
                  $("#typeTwoSale").text(addCommas(data.sale));
                    
                }else if(data.status == -1){
                    toastr.error(data.msg);
                    window.setTimeout(function () {
                        window.location.href = data.url ;
                    }, 1000);
                }else {
                    $("#typeTwoExpence").text(data.total_expenses);
                    $("#typeTwoSale").text(data.sale);
                } 
                setTimeout(function() {
                    $(".alert").hide(1000);
                }, 4000);   
            }               
        });
            
     });

     // This function is used to apply Thousands Separator  
    function addCommas(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }//End

    no_record_msg = '<h4 class="text-danger">No record found</h4>'; 
    //$("#example1").DataTable();
    $('#example2, #example1').DataTable({
      "paging": true,
      "lengthChange": false,
      "searching": true,
      "ordering": true,
      "info": true,
      "autoWidth": false,    
      "blengthChange": false,
      "columnDefs": [
           { orderable: false, targets: -1 },
           { orderable: false, targets: -2 }
        ]
    });


    //users
    var user_table = $('#user_lists');

//var keys = JSON.parse('{'+'"'+$('#user_lists').data('keys')+'"'+':'+'"'+$('#user_lists').data('values')+'"'+'}');
   table = $("#user_lists").DataTable({ 
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' servermside processing mode.
        "lengthChange": false,
        "order": [], //Initial no order.
        "iDisplayLength" :10,
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": base_url+"admin/Users/get_user_list_ajax",
            "type": "POST",
            "dataType": "json",
            "data"   : function(d) {
                var csrf_key = user_table.attr('data-keys');
                var csrf_hash = user_table.attr('data-values');
                d[csrf_key] = csrf_hash;
            },
            "dataSrc": function (jsonData) {
                user_table.attr('data-values',jsonData.csrf); //update new csrf token
                return jsonData.data;
            }
        },
        //Set column definition initialisation properties.
        "columnDefs": [
            { orderable: false, targets: -1 },
            { orderable: false, targets: -2 }
        ]
    }); // Endvar

    

    //users
    var cat_table = $('#category_list');
    
    table = cat_table.DataTable({
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' servermside processing mode.
        "lengthChange": false,
        "order": [], //Initial no order.
        "iDisplayLength" :10,
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": base_url+"admin/category/categoryList",
            "type": "POST",
            "data"   : function( d ) {
                var csrf_key = cat_table.attr('data-csrf-key');
                var csrf_hash = cat_table.attr('data-csrf-hash');
                d[csrf_key] = csrf_hash;
            },
            "dataType": "json",
            "dataSrc": function (jsonData) {
                cat_table.attr('data-csrf-hash',jsonData.csrf); //update new csrf token
                return jsonData.data;
            }
        },
        //Set column definition initialisation properties.
        "columnDefs": [
            { orderable: false, targets: -1 },
            { orderable: false, targets: -2 }
        ]
    }); // End 
   
});

// About us t&c 
$(document).on('submit', "#editFormAjax", function (event) {
    event.preventDefault();
    var formData = new FormData(this);
    $.ajax({
        type: "POST",
        url: $(this).attr('action'),
        data: formData, //only input
        processData: false,
        contentType: false,
         beforeSend: function () {
            show_loader();
         },
        success: function (response, textStatus, jqXHR) {
            hide_loader();
            try {
                
                var data = $.parseJSON(response);
                if (data.status == 1)
                {
                    $("#commonModal").modal('hide');
                    toastr.success(data.message);
                    
                    window.setTimeout(function () {
                        window.location.href = data.url;
                    }, 2000);
                    
                }else {
                    toastr.error(data.message);
                    $('#error-box').show();
                    $("#error-box").html(data.message);
                    
                    setTimeout(function () {
                    $('#error-box').hide(800);
                }, 1000);
                }
            } catch (e) {
                $('#error-box').show();
                $("#error-box").html(data.message);
                
                setTimeout(function () {
                    $('#error-box').hide(800);
                }, 1000);
            }
        }
    });

}); // End

   // Add cateogry 
    $('body').on('click', ".update_category", function (event){  
        //Add product
        var add_category = $("#update_category");  
        add_category.validate({ 
            rules: {
                categoryName: {
                    required: true,
                },  
            },  
        }); //End 

        if(add_category.valid() !== true){
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
                         window.location.href = base_url+"admin/Category";
                    }, 500);

                }else if(data.status == -1){
                    toastr.error(data.msg);
                    window.setTimeout(function () {
                         window.location.href = base_url+"admin";
                    }, 500);

                }else {
                    toastr.error(data.msg);      
                } 
                setTimeout(function() {
                    $(".alert").hide(1000);
                }, 4000);
            },
            error:function (){
                /*toastr.error('Failed! Please try again');*/
            }
        });
    });

     var user_table = $('#user_lists_worker');

//var keys = JSON.parse('{'+'"'+$('#user_lists').data('keys')+'"'+':'+'"'+$('#user_lists').data('values')+'"'+'}');
   table = $("#user_lists_worker").DataTable({ 
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' servermside processing mode.
        "lengthChange": false,
        "order": [], //Initial no order.
        "iDisplayLength" :10,
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": base_url+"admin/Users/get_user_Worker_list_ajax",
            "type": "POST",
            "dataType": "json",
            "data"   : function(d) {
                var csrf_key = user_table.attr('data-keys');
                var csrf_hash = user_table.attr('data-values');
                d[csrf_key] = csrf_hash;
            },
            "dataSrc": function (jsonData) {
                user_table.attr('data-values',jsonData.csrf); //update new csrf token
                return jsonData.data;
            }
        },
        //Set column definition initialisation properties.
        "columnDefs": [
            { orderable: false, targets: -1 },
            { orderable: false, targets: -2 }
        ]
    }); 

    var user_table = $('#user_lists_client');

//var keys = JSON.parse('{'+'"'+$('#user_lists').data('keys')+'"'+':'+'"'+$('#user_lists').data('values')+'"'+'}');
   table = $("#user_lists_client").DataTable({ 
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' servermside processing mode.
        "lengthChange": false,
        "order": [], //Initial no order.
        "iDisplayLength" :10,
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": base_url+"admin/Users/get_user_Client_list_ajax",
            "type": "POST",
            "dataType": "json",
            "data"   : function(d) {
                var csrf_key = user_table.attr('data-keys');
                var csrf_hash = user_table.attr('data-values');
                d[csrf_key] = csrf_hash;
            },
            "dataSrc": function (jsonData) {
                user_table.attr('data-values',jsonData.csrf); //update new csrf token
                return jsonData.data;
            }
        },
        //Set column definition initialisation properties.
        "columnDefs": [
            { orderable: false, targets: -1 },
            { orderable: false, targets: -2 }
        ]
    }); //
  /*    function readURL(input) {
    if(input.files && input.files[0]) {
      var reader = new FileReader();
        reader.onload = function(e){
          $('#blah').attr('src', e.target.result);
        }
       reader.readAsDataURL(input.files[0]);
      }
    }
   $("#inputImage").change(function() {
   readURL(this);
  });*/
   
 /*  $(document).on('click', '.browse', function(){
  var file = $(this).parent().parent().parent().find('.file');
  file.trigger('click');
});
$(document).on('change', '.file', function(){
  $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
});*/

$('#upload-photo').change(function() {
  var i = $(this).prev('label').clone();
  var file = $('#upload-photo')[0].files[0].name;
  $("#image_name").text(file);
});
