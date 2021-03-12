var base_url = $('#tl_admin_main_body').attr('data-base-url');

$("#preloader").hover(function(){
  $("#preloader").show();

});

function show_loader(){
    $('#tl_admin_loader').show();
}

function hide_loader(){
    $('#tl_admin_loader').hide();
}


$(document).ready(function() {
    $("#signup").validate({
        rules: {
            name: {
                required: true,
                maxlength: 30
            },
            email: {
                required: true,
                email:true,
 
            },
            password: {
                required: true,
                maxlength: 20
            },
        }, 

        messages: {
            name: {
                required: "Name field is required.", 
                maxlength:"Max characters should be 30.",
            },
            email: { 
                required: "Subject field is required.",
                email:"Please enter valid email id."
            },
            
            password: {
                    required: "Password field is required.",
            },
        } 
    });
});


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#upload-photo").change(function(){
    readURL(this);
});


$("#editProfile").submit(function(e){
    
    e.preventDefault();
    $(".error").html(''); 
    $.ajax({
        type:"POST",
        url:"editSubmit",
        cache:false,
        contentType: false,
        processData: false,
        data: new FormData(this), 
        beforeSend: function () { 
          show_loader(); 
        },
        success:function(res){
           hide_loader();
            var obj = JSON.parse(res);
                if(obj){
                    $("#hash1").val(obj.messages.hash1);
                    var err = obj.messages;
                    var er = '';
                    $.each(err, function(k, v) { 
                    er = '  ' + v; 
                    $("#"+k+"_error").html(er);
                });
            }
            if(obj.messages.success){
                toastr.success(obj.messages.success);
                var surl = 'profileView'; 
                window.setTimeout(function() { window.location = surl; }, 2000);
            } 
            if(obj.messages.unsuccess){
                toastr.error(obj.messages.unsuccess);
            }
            if(obj.messages.imageerror){
               toastr.error(obj.messages.imageerror);
            }
        }
    });
});

$("#forgetPass").submit(function(e){

    $("#sub_btn").html('wait..'); 
    $("#sub_btn").prop('disabled', true); 
    e.preventDefault();
    $(".error").html(''); 
    // do something in the background
    $.ajax({
        type:"POST",
        url:"admin/forgetPassword",
        data: $(this).serialize(), 
        datatype:"JSON",
        success:function(res){
            var obj = JSON.parse(res);
            if(obj){
                var err = obj.messages;
                var er = '';
                $.each(err, function(k, v) { 
                    er = '  ' + v; 
                    $("#"+k+"_error").html(er);
                    $("#sub_btn").html('Success');
                });
                $("#sub_btn").html('Reset'); 
                $("#sub_btn").prop('disabled', false);
            }
            if(obj.messages.success){
                $.toaster({ priority : 'success', message : obj.messages.success});
                var surl = 'admin'; 
                window.setTimeout(function() { window.location = surl; }, 2000);
            } 
            if(obj.messages.unsuccess){
                $("#sub_btn").html('Reset'); 
                $("#sub_btn").prop('disabled', false);
                $('#unsuccess').html(obj.messages.unsuccess);
            }
        }
    });
});

$("#setPass").submit(function(e){
    $("#sub_btn").html('wait..'); 
    e.preventDefault();
    $(".error").html(''); 
    $.ajax({
        type:"POST",
        url:"../../setPassReset",
        data: $(this).serialize(), 
        datatype:"JSON",
        success:function(res){
            var obj = JSON.parse(res);
            if(obj){
                var err = obj.messages;
                var er = '';
                $.each(err, function(k, v) { 
                    er = '  ' + v; 
                    $("#"+k+"_error").html(er);
                    $("#sub_btn").html('Success');
                    window.setTimeout(function() {  $("#sub_btn").html('Submit'); }, 1000);
                });
            }
            if(obj.messages.success){
                toastr.success(obj.messages.success);
                var surl = '../../'; 
                window.setTimeout(function() { window.location = surl; }, 2000);
            } 
            if(obj.messages.unsuccess){
               $('#unsuccess').html(obj.messages.unsuccess);
            }
        }
    });
});

$("#setPassUser").submit(function(e){
    $("#sub_btn").html('wait..'); 
    e.preventDefault();
    $(".error").html(''); 
    $.ajax({
        type:"POST",
        url:"../../setPassReset",
        data: $(this).serialize(), 
        datatype:"JSON",
        success:function(res){
            var obj = JSON.parse(res);
            if(obj){
                var err = obj.messages;
                var er = '';
                $.each(err, function(k, v) { 
                er = '  ' + v; 
                $("#"+k+"_error").html(er);
                    $("#sub_btn").html('Success');
                    window.setTimeout(function() {  $("#sub_btn").html('Submit'); }, 1000);
               });
            }
            if(obj.messages.success){
                toastr.success(obj.messages.success);
                var surl = '../../passwordSet'; 
                window.setTimeout(function() { window.location = surl; }, 2000);
            } 
            if(obj.messages.unsuccess){
               $('#unsuccess').html(obj.messages.unsuccess);
            }
        }
    });
});

function logout(){
    swal({
        title: "Logout ! Are you sure?",
        icon: base_url+"/backend_assets/images/logo/livewire1.png",
        showCancelButton: true,
        buttons: true,
        dangerMode: false,
        allowOutsideClick: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            $.toaster({ priority : 'success', message : 'Successfully Logged Out..'});
            var surl = base_url+'admin/logout'; 
            window.setTimeout(function() { window.location = surl,500;});
        }
    });
}

var deleteImg = function(id) {
    var image = $("#image").val();
      if(image){
        bootbox.confirm({
            message: "Are you sure, you want to delete your image.?",
            buttons: {
                confirm: {
                  label: 'Ok',
                  className: 'btn-primary'
                },
                cancel: {
                  label: 'Cancel',
                  className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result) {
                    show_loader();
                    $.ajax({
                        type:"POST",
                        url:'deleteImg',
                        data:{'id':id,'image':image},
                        datatype:"json",
                        success: function(res){
                            var obj = JSON.parse(res);
                            if(obj.success){
                                var surl ='profileView'; 
                                window.setTimeout(function() { window.location = surl; }, 500);
                            }
                        }
                    });
                } 
            }
        });
    }else{
      toastr.error("Image not found.");
    }
}

$("#changePass").submit(function(e){ //change admin password function...
    e.preventDefault();
    $(".error").html('');
    $.ajax({
        type:"POST",
        url:"changePassword",
        data:$(this).serialize(),
        datatype:"json",
        beforeSend: function () { 
            show_loader(); 
        },
        success:function(res){
            hide_loader();
            var obj = JSON.parse(res);
            if(obj){
                // alert(obj.messages.hash);
                $("#hash").val(obj.messages.hash);
                var err = obj.messages;
                var er = '';
                $.each(err, function(k, v) { 
                    er = '  ' + v; 
                    $("#"+k+"_error").html(er);
               });
            }
            if(obj.messages.success){
                $("#success").html(obj.messages.success); 
                toastr.success(obj.messages.success);
                var surl = 'profileView';
                // var surl = 'admin/logout'; 
                window.setTimeout(function() { window.location = surl; }, 2000);
            }
            if(obj.messages.oldPaas){
                toastr.error(obj.messages.oldPaas);
                $("#hash").val(obj.messages.hash);
            }
        }
    });
});

$(function () {
    var user_list = $('#userList').DataTable({ 
        "processing": true, //Feature control the processing indicator. 
        "serverSide": true, //Feature control DataTables' servermside processing mode. 
        "order": [], //Initial no order. 
        "paging": true, "lengthChange": false, 
        "searching": true, 
        "ordering": true, 
        "info": true, 
        "autoWidth": false, 
        "blengthChange": false, 
        "iDisplayLength" :10, 
        "bPaginate": true, 
        "bInfo": true, 
        "bFilter": false, 
      
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": base_url+"admin/users/getUsersList",
            "type": "POST",
            "dataType": "json",
            "dataSrc": function (jsonData) { 
              return jsonData.data;
            }
        },
        //Set column definition initialisation properties.
        "columnDefs": [
            { orderable: false, targets: -1 }, 
        ]
    });
});

$(function () {
    var user_list = $('#postList').DataTable({ 
        "processing": true, //Feature control the processing indicator. 
        "serverSide": true, //Feature control DataTables' servermside processing mode. 
        "order": [], //Initial no order. 
        "paging": true, "lengthChange": false, 
        "searching": true, 
        "ordering": true, 
        "info": true, 
        "autoWidth": false, 
        "blengthChange": false, 
        "iDisplayLength" :10, 
        "bPaginate": true, 
        "bInfo": true, 
        "bFilter": false, 
      
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": base_url+"admin/users/postList",
            "type": "POST",
            "dataType": "json",
            "dataSrc": function (jsonData) { 
              return jsonData.data;
            }
        },
        //Set column definition initialisation properties.
        "columnDefs": [
            { orderable: false, targets: -1 }, 
        ]
    });
});

function model(){
  $('#model').modal("show");
}

var statusFn = function (table, field, id, status,dataitem,showmsg) {
    var message = "";
    if (status == '1') {
        message = "inactive";
        tosMsg = 'Successfully inactivated';
    } else if (status == '0') {
        message = "active";
        tosMsg = 'Successfully activated';
    }
    bootbox.confirm({
        message: "Are you sure, you want to " + message + " this "+dataitem+" ?",
        buttons: {
            confirm: {
              label: 'Ok',
              className: 'btn-primary'
            },
            cancel: {
              label: 'Cancel',
              className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                show_loader();
                var url = base_url+"admin/activeInactive";
                $.ajax({
                    method: "POST",
                    url: url,
                    data: {id: id, id_name: field, table: table, status: status},
                    datatype:"JSON",
                    success: function (response) {
                        hide_loader();
                        var obj = JSON.parse(response);
                        if (response) {
                            if(obj.messages.activated){
                                  toastr.success(showmsg +' '+ obj.messages.activated);
                                  window.setTimeout(function () {
                                  window.location.reload();
                                 }, 2000);
                            }else{
                                toastr.error(showmsg +' '+ obj.messages.inactivated);
                                  window.setTimeout(function () {
                                  window.location.reload();
                                 }, 2000);

                            }  
                        }
                    },
                    error: function (error, ror, r) {
                        bootbox.alert(error);
                    },
                });
            }
        }
    });
}

var deleteFn = function (table, field, id, status,dataitem,error) {

    var errorMessage = status;
    var message = "";
    bootbox.confirm({
        message: "Are you sure, you want to delete this"+' '+status+"?",
          buttons: {
            confirm: {
              label: 'Ok',
              className: 'btn-primary'
            },
            cancel: {
              label: 'Cancel',
              className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                show_loader();
                var url = base_url+"admin/deleteBusinessData";
                $.ajax({
                    method: "POST",
                    url: url,
                    data: {id: id, id_name: field, table: table, status: status},
                    datatype:"JSON",
                    success: function (response) {
                        hide_loader();
                        var obj = JSON.parse(response);
                        if (response) {
                            if(obj.messages.delete){
                                $.toaster({ priority : 'warning', title : 'Notice', message : errorMessage+' '+ "deleted successfully"});
                                window.setTimeout(function () {
                                window.location.reload();
                                }, 2000);
                            }else{
                                $.toaster({ priority : 'danger', title : 'Notice', message : obj.messages.notDelete});
                                  window.setTimeout(function () {
                                  window.location.reload();
                                }, 2000);

                            }  
                        }
                    },
                    error: function (error, ror, r) {
                        bootbox.alert(error);
                    },
                });
            }
        }
    });
}

$(function () {
    "use strict";
    $(".popup img").click(function () {
        var $src = $(this).attr("src");
        $(".show").fadeIn();
        $(".img-show img").attr("src", $src);
    });
    
    $("span, .overlay").click(function () {
        $(".show").fadeOut();
    });
});

$(".compress").hover(function(){
    $(".image").show();
});