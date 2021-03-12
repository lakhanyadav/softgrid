function show_loader(){
    $('#tl_front_loader').show();
}

function hide_loader(){
    $('#tl_front_loader').hide();
}
window.fbAsyncInit = function() {
    FB.init({
        appId: '238182020387506',
        status: true,
        cookie: true,
        xfbml: true
    });
};

// Load the SDK asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            getUserData();
        }
    }, {scope: 'email,public_profile', return_scopes: true});            
}

function getUserData() {

    FB.api('/me',{fields: 'name,id,email'}, function(response) { 
        var name = response.name;
        var socialId = response.id;
        var email =  (response.email != '' && typeof response.email != "undefined" ) ? response.email : '';
        var socialType = 'facebook' ;
        var profileImage = "https://graph.facebook.com/"+response.id+"/picture?type=large"; 

        var fbData = {
            name: response.name,
            socialId: response.id,
            email: (response.email != '' && typeof response.email != "undefined" ) ? response.email : '',
            socialType: "facebook",
            profileImage:"https://graph.facebook.com/"+response.id+"/picture?type=large"
        }; 
        $.ajax({
            "url": base_url+"auth/socialLogin",
            type: "POST",
            data: fbData,
            dataType:"JSON",
            beforeSend: function () { 
                show_loader(); 
            },
            success: function (data) {
                hide_loader();
                if(data.status == 1){// If social id found into DB
                    console.log(data.url);
                    toastr.success(data.msg);  
                    window.setTimeout(function () {
                        window.location.href = data.url;
                    }, 500);
                }else if(data.status == 2){ // If social id not found into DB
                    $('#socialName').val(name);
                    if(email != '' && typeof email != "undefined"){
                        $('#clientEmail').val(email);
                        $("#clientEmail").attr('readonly','readonly');
                    }
                    $('#clientSocialType').val(socialType);
                    $('#clientSocialId').val(socialId);
                    $('#clientprofileImage').val(profileImage);
                    $("#socialclientImg").attr("src",profileImage);
                    $("#googlemodal").modal('show');
                }else {
                    toastr.error(data.msg);    
                } 
                setTimeout(function() {
                    $(".alert").hide(1000);
                }, 4000);   
            },
        });
        facebookLogout();
    });
}
function facebookLogout() {
    FB.logout(function() {})
}