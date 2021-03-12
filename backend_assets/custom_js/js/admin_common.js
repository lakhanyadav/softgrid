  
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

    jQuery.validator.addMethod('checkImageDiamention', function(value, element) {
        
        var imageHeightWidth = $("#imageHeightWidth").val();
        if(imageHeightWidth == 1){
            return true;
        }else{
            return false;
        }
    });

    jQuery.validator.addMethod('checkImageFiles', function(value, element) {
        
        var checkFileInput = $("#checkFileInput").val();
        if(checkFileInput == 1){
            return true;
        }else{
            return false;
        }
    });


    $('body').on('click', ".member_list", function (event) {
        var jobId = $(this).attr('data-jobId');

        var url = base_url + 'admin/Jobpost/jobMemberList';
        $.ajax({
            type:'POST',
            url:url,
            data:{'jobId':jobId},
            beforeSend: function () { 
                show_loader();
            },              
            success: function(data){ 
                hide_loader();
                $('#member-list').html(data);
                $("#MemberList").modal('show');
            }
        }); 
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
            parentCategory: {
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
                         window.location.href = base_url+"admin/Category/addParentCategory";
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

    //Show payment info Modal
    $('#show_payment_info').on('show.bs.modal', function (event) {
        var _that = $(this),
            //the clicked element is available as the relatedTarget property of the event.
            target_element = $(event.relatedTarget),
            payment_info = target_element.attr('data-payment-info');
        
        $.each( JSON.parse(payment_info), function( key, value ) {
            $('#'+key).html(value);
        });
    })

    // Add sub-cateogry 
    $('body').on('click', ".add_sub_category", function (event){  
    //Add product
    var add_category = $("#add_Subcategory");  
    add_category.validate({ 
        rules: {
            category: {
                required: true,
            },
            parentCategory: {
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
                         window.location.href = data.url;
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
    });// End


    //Set admin commission
    $('body').on('click', ".adminComs", function (event){
        //Add product
        var add_commission = $("#add_commission");  
        add_commission.validate({ 
            rules: {
                commission: {
                    required: true,
                },  
            },  
        }); //End 
        if(add_commission.valid() !== true){
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
                         window.location.href = base_url+"admin/profileView";
                    }, 500);

                }else if(data.status == -1){
                    
                    toastr.error(data.msg);
                    window.setTimeout(function () {
                         window.location.href = data.url;
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


    });//End


    //Delete Blog 
    function deleteBlog(id){
        bootbox.confirm({
            message: "Do you want to delete this blog?",
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
                        url: base_url + 'admin/blog/deleteBlog',
                        type: 'POST',
                        data:{'blogId':id},
                        beforeSend: function () { 
                             show_loader(); 
                        },
                        success: function (response) {  
                            hide_loader(); 
                            var data = JSON.parse(response);       
                            if (data.status == 1){ 
                                toastr.success(data.msg);
                                window.setTimeout(function () {
                                     window.location.href = base_url+"admin/blog/blogList";
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
    } // End

    function editBlog(id){
         toastr.error('under development mode'); return false;
    }


    //This function is used for add sub-category
    $('body').on('click', "#add_category_popup", function (event) {
        $.ajax({
            url: base_url + 'admin/Category/add_category_popup',
            beforeSend: function(){
                /*show_loader();*/
            },
            success: function(data, textStatus, jqXHR){
                /*hide_loader();*/
                $('#getCategoryPopUp').html(data);
                $("#form-modal-box").modal('show');
            }
        });
    });//End

    //This function is used for add category
    $('body').on('click', "#add_parent_category_popup", function (event) {
        $.ajax({
            url: base_url + 'admin/Category/add_parent_category_popup',
            beforeSend: function(){
                /*show_loader();*/
            },
            success: function(data, textStatus, jqXHR){
                /*hide_loader();*/
                $('#getCategoryPopUp').html(data);
                $("#form-modal-box").modal('show');
            }
        });
    });//End


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



    var addBlog = $("#addBlog");
    addBlog.validate({
        rules:{
            blog_title:{
                required: true,
                maxlength:200,
            },
            blogImage:{
                required: true,
                checkImageDiamention: true,
            },
            description:{
                required:true,
            }
        },
        messages:{
            blog_title: {
                required:"Blog title are required",
                maxlength:" Blog title maximum length is 200 Characters",
            },
            blogImage:{
                required:"Please select blog image",
                checkImageDiamention:'Image minimum height and width  340x255',
            },
            description:{
                required:"Blog description are required",
            },
        },

        errorPlacement: function(error, element){
            
            //if input parent elemnt has 'input-group' class then place error element after that parent div
            if (element.parent().hasClass('form-group')) {
               error.insertAfter(element.parent());
            }else{
                error.insertAfter($('#tt'));
            }
        }
        
    });


    $('body').on('click', '.add_blog',function(event){
        $('#image_error').hide();
        if(addBlog.valid() !== true){
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
                         window.location.href = base_url+"admin/blog/blogList";
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
                toastr.error('Something went wrong');
            }
        });
    });

    var updateBlog = $("#updateBlog");
    updateBlog.validate({
        rules:{
            blog_title:{
                required: true,
                maxlength:200,
            },
            blogImage:{
                checkImageFiles: true,
                checkImageDiamention: true,
            },
            description:{
                required:true,
            }
        },
        messages:{
            blog_title: {
                required:"Blog title are required",
                maxlength:"Blog title maximum length is 200 Characters",
            },
            blogImage:{
                checkImageFiles:"Please select blog image",
                checkImageDiamention:'Image minimum height and width  340x255',
            },
            description:{
                required:"Blog description are required",
            },
        },

        errorPlacement: function(error, element){
            
            //if input parent elemnt has 'input-group' class then place error element after that parent div
            if (element.parent().hasClass('form-group')) {
               error.insertAfter(element.parent());
            }else{
                error.insertAfter($('#tt'));
            }
        }
        
    });


    $('body').on('click', '.update_blog',function(event){
        $('#image_error').hide();
        if(updateBlog.valid() !== true){
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
                         window.location.href = base_url+"admin/blog/blogList";
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
                toastr.error('Something went wrong');
            }
        });
    });



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
                try{
                    var data = $.parseJSON(response);
                    if (data.status == 1){
                        $("#commonModal").modal('hide');
                        toastr.success(data.message);
                        window.setTimeout(function () {
                            window.location.href = data.url;
                        }, 2000);
                        
                    }else{
                        toastr.error(data.message);
                        $('#error-box').show();
                        $("#error-box").html(data.message);
                        
                        setTimeout(function () {
                        $('#error-box').hide(800);
                    }, 1000);
                    }
                }catch (e){
                    $('#error-box').show();
                    $("#error-box").html(data.message);
                    setTimeout(function () {
                        $('#error-box').hide(800);
                    }, 1000);
                }
            }
        });
    });//End

    //Private & policy 
    $(document).on('submit', "#privateEditFormAjax", function (event) {
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
                    if (data.status == 1){
                        $("#commonModal").modal('hide');
                        toastr.success(data.message);
                        window.setTimeout(function () {
                            window.location.href = data.url;
                        }, 2000);
                        
                    }else{
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
    });//End

    //Term & condition 
    $(document).on('submit', "#termEditFormAjax", function (event) {
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
    });//End

    //disclamier 
    $(document).on('submit', "#disclamierEditFormAjax", function (event) {
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
                    if (data.status == 1){
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
    });//End


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

    
    //view model 
    var viewFn = function (ctrl, method, id) {
        $.ajax({
            url: base_url + ctrl + "/" + method,
            type: 'POST',
            data: {'id': id},
            beforeSend: function () {
                show_loader()
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


    var editParent = function(id){
        $.ajax({
            url: base_url + 'admin/Category/editParentCategory',
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

    var showJobDetail = function(jobId,jobType){

        $.ajax({
            url: base_url + 'admin/Jobpost/showJobDetailInPopup',
            type: 'POST',
            data:{'jobId':jobId,'jobType':jobType},
            beforeSend: function(){
               show_loader();
            },
            success: function(data, textStatus, jqXHR){
                hide_loader();
                $('#my-jobs-details').html(data);
                $("#myonceModal").modal('show');
            }
        });
    }

    var showPaymentDetail = function(transactionId){
        $.ajax({
            url: base_url + 'admin/Payment/paymentDetails',
            type: 'POST',
            data:{'transactionId':transactionId},
            beforeSend: function(){
               show_loader();
            },
            success: function(data, textStatus, jqXHR){
                hide_loader();
                $('#show-payment-detail').html(data);
                $("#paymentModal").modal('show');
            }
        });
    }

    var showPayoutDetail = function(payoutrequestId){
        $.ajax({
            url: base_url + 'admin/Payout/payoutDetails',
            type: 'POST',
            data:{'payoutrequestId':payoutrequestId},
            beforeSend: function(){
               show_loader();
            },
            success: function(data, textStatus, jqXHR){
                hide_loader();
                $('#show-payout-detail').html(data);
                $("#paymentModal").modal('show');
            }
        });
    }



    //Delete sub-category 
    function deletefn(id){

        bootbox.confirm({
            message: "Do you want to delete this sub category?",
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



    //Delete parent-category 
    function deleteParentCategory(id){

        bootbox.confirm({
            message: "Do you want to delete this category?",
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
                                     window.location.href = base_url+"admin/Category/addParentCategory";
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
                        success: function (response) {
                            var data = JSON.parse(response);
                            if (data.status == 1) {
                                toastr.success(data.message);
                                window.setTimeout(function () {
                                    window.location.reload();
                                }, 500);
                            }else{
                                toastr.error(data.message);
                                window.setTimeout(function () {
                                    window.location.reload();
                                }, 500);
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
    var user_table = $('#blog_lists');
    table = $("#blog_lists").DataTable({ 
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' servermside processing mode.
        "lengthChange": false,
        "order": [], //Initial no order.
        "iDisplayLength" :10,
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": base_url+"admin/blog/ajax_blog_list",
            "type": "POST",
            "dataType": "json",
            "data"   : {},
            "dataSrc": function (jsonData) {
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
    table = $("#all_jobs_list").DataTable({ 
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' servermside processing mode.
        "lengthChange": false,
        "order": [], //Initial no order.
        "iDisplayLength" :10,
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": base_url+"admin/Jobpost/get_all_job_post",
            "type": "POST",
            "dataType": "json",
             "data": {},
            "dataSrc": function (jsonData) {
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
    table = $("#all_once_jobs_list").DataTable({ 
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' servermside processing mode.
        "lengthChange": false,
        "order": [], //Initial no order.
        "iDisplayLength" :10,
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": base_url+"admin/Jobpost/get_all_once_jobs",
            "type": "POST",
            "dataType": "json",
             "data": {},
            "dataSrc": function (jsonData) {
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
    table = $("#all_ongoing_jobs_list").DataTable({ 
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' servermside processing mode.
        "lengthChange": false,
        "order": [], //Initial no order.
        "iDisplayLength" :10,
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": base_url+"admin/Jobpost/get_all_ongoing_jobs",
            "type": "POST",
            "dataType": "json",
             "data": {},
            "dataSrc": function (jsonData) {
                return jsonData.data;
            }
        },
        //Set column definition initialisation properties.
        "columnDefs": [
            { orderable: false, targets: -1 },
            { orderable: false, targets: -2 }
        ]
    }); // Endvar


    //Crop detail list
    table = $('#jobsList').DataTable({ 
        "oLanguage": {
        "sEmptyTable": "No record found",
        },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' servermside processing mode.
        "lengthChange": false,
        "searching": false,
        //"order": [], //Initial no order.
        "iDisplayLength" :10,
        
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": base_url+"admin/Users/getJobList",
            "type": "POST",
            "dataType": "json",
            "data": {userId: $('#my_jobs').attr('data-userId')},
            "dataSrc": function (jsonData) {
                return jsonData.data;
            }
        },
        
        //Set column definition initialisation properties.
        "columnDefs": [
             { orderable: false, targets: -1 },
            { orderable: false, targets: -2 }   
        ]
    });

    //Crop detail list
    table = $('#workerSideJobList').DataTable({ 
        "oLanguage": {
        "sEmptyTable": "No record found",
        },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' servermside processing mode.
        "lengthChange": false,
        "searching": false,
        //"order": [], //Initial no order.
        "iDisplayLength" :5,
        
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": base_url+"admin/Users/getWorkerJobList",
            "type": "POST",
            "dataType": "json",
            "data": {userId: $('#my_jobs').attr('data-userId')},
            "dataSrc": function (jsonData) {
                return jsonData.data;
            }
        },
        
        //Set column definition initialisation properties.
        "columnDefs": [
             { orderable: false, targets: -1 },
            { orderable: false, targets: -2 }   
        ]
    });

    //users
    table = $("#payment_lists").DataTable({ 
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' servermside processing mode.
        "lengthChange": false,
        "order": [], //Initial no order.
        "iDisplayLength" :10,
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": base_url+"admin/Payment/get_payment_list",
            "type": "POST",
            "dataType": "json",
             "data": {},
            "dataSrc": function (jsonData) {
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
    table = $("#payout_lists").DataTable({ 
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' servermside processing mode.
        "lengthChange": false,
        "order": [], //Initial no order.
        "iDisplayLength" :10,
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": base_url+"admin/Payout/get_payout_list",
            "type": "POST",
            "dataType": "json",
            "data": {},
            "dataSrc": function (jsonData) {
                return jsonData.data;
            }
        },
        //Set column definition initialisation properties.
        "columnDefs": [
            { orderable: false, targets: -1 },
            { orderable: false, targets: -2 }
        ]
    }); // Endvar


    //Crop detail list
    table = $('#mytransaction').DataTable({ 
        "oLanguage": {
        "sEmptyTable": "No record found",
        },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' servermside processing mode.
        "lengthChange": false,
        "searching": false,
        //"order": [], //Initial no order.
        "iDisplayLength" :10,
        
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": base_url+"admin/Users/get_my_payment_list",
            "type": "POST",
            "dataType": "json",
            "data": {userId: $('#my_jobs').attr('data-userId')},
            "dataSrc": function (jsonData) {
                return jsonData.data;
            }
        },
        
        //Set column definition initialisation properties.
        "columnDefs": [
            { orderable: false, targets: -1 },
            { orderable: false, targets: -2 }   
        ]
    });

   
    table = $("#category_list").DataTable({
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' servermside processing mode.
        "lengthChange": false,
        "order": [], //Initial no order.
        "iDisplayLength" :10,
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": base_url+"admin/category/categoryList",
            "type": "POST",
            "dataType": "json",
             "data": {},
            "dataSrc": function (jsonData) {
                return jsonData.data;
            }
        },
        //Set column definition initialisation properties.
        "columnDefs": [
            { orderable: false, targets: -1 },
            { orderable: false, targets: -2 }
        ]
    }); // End 

    //users
    table = $("#parentCategory_list").DataTable({ 
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' servermside processing mode.
        "lengthChange": false,
        "order": [], //Initial no order.
        "iDisplayLength" :10,
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": base_url+"admin/category/parentCategoryList",
            "type": "POST",
            "dataType": "json",
             "data": {},
            "dataSrc": function (jsonData) {
                return jsonData.data;
            }
        },
        //Set column definition initialisation properties.
        "columnDefs": [
            { orderable: false, targets: -1 },
            { orderable: false, targets: -2 }
        ]
    }); // Endvar


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
                parentCategory: {
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

    // Add cateogry 
    $('body').on('click', ".update_parent_category", function (event){  
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
                         window.location.href = base_url+"admin/Category/addParentCategory";
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
      function readURL(input) {
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
  });
   
   $(document).on('click', '.browse', function(){
  var file = $(this).parent().parent().parent().find('.file');
  file.trigger('click');
});
$(document).on('change', '.file', function(){
  $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
});


//when click on load more button 
$('body').on('click', "#btnLoadRecMember", function (event) {
        is_load_more = 1;
    get_request_members(is_load_more);
});

function get_request_members(is_load_more = 0){
    if(is_load_more!=0){//if is_load_more is not 0 then get offset data from btnlod attr
        offset = $('#btnLoadRecMember').attr("data-offset");
    }else{ //set offset =0 when is_load_more is 0
        offset = 0;
    }
    var jobId = $('#jobId').val();
   
    $.ajax({
        url: base_url+"admin/Jobpost/get_applicants_list",
        type: "POST",
        data:{offset:offset,jobId:jobId},
        dataType: "JSON",
        beforeSend: function() {
            show_loader();
        }, 
        success: function(data){
            hide_loader();
           
            $('.load_btn_remove').remove();//remove load more button 
            if(offset==0){ //clear div when offset 0
                $("#worker_request_list").html('');
            }
            if(data.no_record==0){//show data in div when no previous record 
                $("#worker_request_list").html(data.html_receive);
            }else{//append data when already record show in view
                $("#worker_request_list").append(data.html_receive);
                $("#requestLoadmore").append(data.btn_html);
            }
        },
    }); 
}

//Dispute Data table
var dispute_table = $('#all_dispute_list');
   table = dispute_table.DataTable({
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' servermside processing mode.
        "lengthChange": false,
        "order": [], //Initial no order.
        "iDisplayLength" :20,
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": base_url+"admin/dispute/get_dispute_list_ajax",
            "type": "POST",
            "dataType": "json",
            "data"   : function(d) {
            },
            "dataSrc": function (jsonData) {
                return jsonData.data;
            }
        },
        //Set column definition initialisation properties. (Remove sorting option)
        "columnDefs": [
            { orderable: false, targets: -1 },
            { orderable: false, targets: -2 }
        ]
    });

//Dispute actions(Reject, Resolve, View);
$('body').on('click', '.dispute-actions', function(event){
    var _that = $(this),
        action_type = _that.attr('data-action-type'),
        url = base_url+"admin/dispute/action_handler",
        dispute_id = _that.parent().attr('data-dispute-id'),
        job_id = _that.parent().attr('data-job-id'),
        data_send = { action_type:action_type, dispute_id:dispute_id, job_id:job_id },
        modal_cont = $('#dispute-actions-container'); //Modal container

    $.ajax({
        type: "POST",
        url: url,
        data: data_send,
        dataType: "JSON",
        beforeSend: function () { 
            show_loader();
        },
        complete:function() {
            hide_loader(); 
        },           
        success: function(data) {
        
            if(data.status == 1) {

                switch(action_type) {
                    case 'resolve':
                        // Resolve Dispute
                        $('#dispute-detail-modal').modal('hide');
                        modal_cont.html(data.html);
                        $('#resolve_dispute').modal('show');
                        break;
                    case 'reject':
                        // Reject Dispute
                        toastr.success(data.msg);
                        window.setTimeout(function () {
                            //window.location.reload;
                            location.reload();
                        }, 2000);
                        break;
                    default:
                        // View Dispute Details
                        modal_cont.html(data.html);
                        $('#dispute-detail-modal').modal('show');

                }

            } else if(data.status == -1) {
                toastr.error(data.msg);
                window.setTimeout(function () {
                    window.location.href = data.url ;
                }, 2000);
            } else {
                toastr.error(data.msg); 
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            toastr.error(err_unknown);
        }
    });
});

//Dispute resolve actions dropdown
$('body').on('change', '#select_dispute_action', function(e) {
    var _that = $(this),
        sel_val = this.options[e.target.selectedIndex].value,
        hirer_pay = $('#resolve_done input[name ="hirer_pay"]'),
        worker_pay = $('#resolve_done input[name ="worker_pay"]');
    console.log(sel_val);
    hirer_pay.val(''); worker_pay.val('');
    switch( sel_val ) {
        case '0':
            // None
            hirer_pay.parent().hide();
            worker_pay.parent().hide();
            break;
        case '1':
            // Refund to hirer
            hirer_pay.parent().show();
            worker_pay.parent().hide();
            break;
        case '2':
            // Pay to worker
            hirer_pay.parent().hide();
            worker_pay.parent().show();
            break;
        case '3':
            // Partial Pay
            hirer_pay.parent().show();
            worker_pay.parent().show();
            break;
    }
    
});

//Submit dispute resolve handler
$('body').on('click', '.resolve-done', function(e) {

    var _that = $(this), 
        form = _that.closest('form');
    //Validations
    form.validate({ 
        rules: {
            hirer_pay: {
                number: true
            },
            worker_pay: {
                number: true
            },  
        },  
    });

    if( form.valid() !== true ) {
        toastr.error(proceed_err); return false;
    }
    
    var formData = new FormData(form[0]),
        f_action = form.attr('action');
    
    $.ajax({
        type: "POST",
        url: f_action,
        data: formData,
        processData: false,
        contentType: false,
        dataType: "JSON",
        beforeSend: function () { 
            show_loader();
        },
        complete:function() {
            hide_loader(); 
        },           
        success: function(data) {
        
            if( data.status == 1 ) { 
                toastr.success(data.msg);
                window.setTimeout(function () {
                    window.location.reload;
                }, 2000);
            } else if( data.status == -1 ) {
                toastr.error(data.msg);
                window.setTimeout(function () {
                    window.location.href = data.url ;
                }, 2000);
            } else {
                toastr.error(data.msg); 
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            toastr.error(err_unknown);
        }
    }); 
        
});

    
