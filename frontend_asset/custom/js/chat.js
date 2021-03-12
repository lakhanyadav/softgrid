var setValue = function(key,value){

    if($('#'+key).length==0){
        $('<input>').attr({type: 'hidden', id: key, name: key,value:value}).appendTo('head');
    }else{
        $("#"+key).val(value);
    }
    return true;
}

var getValue = function(key){
    return $("#"+key).val();
}

var arrayshort = function(data){
 
    var array = [];
    $.each(data, function(key, value) {
        if(typeof value !== "undefined" || value != null)
            array.push(value);
    });
    return array.sort(function(a, b) {
    var a1 = a.timestamp,
        b1 = b.timestamp;
    if (a1 == b1) return 0;
        return a1 < b1 ? 1 : -1;
    });
}

//convert timestamp into date/time here
function getDateFormat(date) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    var time = moment(date).format("h:mm A");

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    var date = new Date();
    date.toLocaleDateString();
    return [time];
    //return [day, month, year].join('-');
}

var typingTimer;                //timer identifier
var doneTypingInterval = 100;  //time in ms, 5 second for example
var $input = $('#searchText'); // get input 

//on keyup, start the countdown
$input.on('keyup', function () {
    
    clearTimeout(typingTimer);
    typingTimer = setTimeout(getChatHistory, doneTypingInterval); //"getChatHistory" is function for call
});

//on keydown, clear the countdown 
$input.on('keydown', function () {
    clearTimeout(typingTimer);
});

function time_ago(time) {

    switch (typeof time) {
        case 'number':
          break;
        case 'string':
          time = +new Date(time);
          break;
        case 'object':
          if (time.constructor === Date) time = time.getTime();
          break;
        default:
        time = +new Date();
    }
    var time_formats = [
        [60, 'seconds', 1], // 60
        [120, '1 minute ago', '1 minute from now'], // 60*2
        [3600, 'minutes', 60], // 60*60, 60
        [7200, '1 hour ago', '1 hour from now'], // 60*60*2
        [86400, 'hours', 3600], // 60*60*24, 60*60
        [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
        [604800, 'days', 86400], // 60*60*24*7, 60*60*24
        [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
        [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
        [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
        [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
        [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,token = 'ago',list_choice = 1;

    if (seconds == 0) {
        return 'Just now'
    }
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'from now';
        list_choice = 2;
    }
    var i = 0,
    format;
    while (format = time_formats[i++])
        if (seconds < format[0]) {
            if (typeof format[2] == 'string')
                return format[list_choice];
            else
            return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
        }
    return time;
}


//for sending messages
function sendMsg(downloadURL='') {

    var senderId     = getValue('senderId'); 
    let senderName   = getValue('senderName');
    let senderImg    = getValue('senderImg'); 
    let message      = $.trim($('#message').val()); // get textarea message
    let receiverId   = getValue('receiverId');
    let oppoName     = getValue('name');
    let oppoImg      = getValue('img');

    imageUrl = downloadURL ? downloadURL : '';
    image = downloadURL ? 1 : 0;

    if(message.length > 0 || downloadURL !='' ){

        $('#message').val('');

        var msgData = {

            deleteby        : "",
            firebaseId      : "",
            firebaseToken   : "",
            image           : image,
            imageUrl        : imageUrl,
            lastMsg         : senderId,
            message         : message,
            name            : senderName,
            profilePic      : senderImg,
            timestamp       : Date.now(),            
            uid             : senderId,
            type            : 'user',
            unreadCount     : 1 
        };

        msgData.isMsgReadTick =  0;
        firebase.database().ref().child('chat_rooms').child(senderId).child(receiverId).push(msgData);

        //msgData.isMsgReadTick = 2;
        firebase.database().ref().child('chat_rooms').child(receiverId).child(senderId).push(msgData);

        delete msgData.isMsgReadTick;

        msgData.uid         = receiverId;
        msgData.name        = oppoName;
        msgData.profilePic  = oppoImg; 
        msgData.unreadCount = 0;

        firebase.database().ref('/chat_history/' + senderId).child(receiverId).set(msgData);

        msgData.uid         = senderId;
        msgData.name        = senderName;
        msgData.profilePic  = senderImg;


        setUnread(senderId,msgData);

        let token = getValue('token');

        if(token){

            notification = {

                'title'         : senderName,
                'body'          : message,
                'type'          : 'chat',
                'sender_name'   : senderName,
                'message'       : message,
                'time'          : Date.now(),
                'opponentChatId': senderId,
                'click_action'  : 'ChatActivity',
                'sound'         : 'default'
            }

            senNotifcation(token,notification,notification);
        }

        let webNotification = {
                        
            'body'  : downloadURL ? 'Image' : message,
            'opnId' : senderId,
            'title' : senderName,
            'url'   : BASE_URL+'user/userChat/?uId='+ receiverId
        };

        senWebNotifcation(receiverId,webNotification);
    }    
}


function setUnread(senderId,msgData){

    let receiverId = getValue('receiverId');

    firebase.database().ref("chat_history").child(receiverId).child(senderId).once('value', function(snapshot) { 

        msgData.unreadCount = 1;

        if(snapshot.val()){

            let count = Number(snapshot.val().unreadCount) + Number(1);
            msgData.unreadCount = count;
        }
        firebase.database().ref('/chat_history/' + receiverId).child(senderId).set(msgData);
    });
}

function updateUnreadStatus(){      

    var senderId    = getValue('senderId');
    let receiverId  = getValue('receiverId');

    var query = firebase.database().ref("chat_history").child(senderId).child(receiverId);

    query.once('value', function(snapshot) {

        if(snapshot.val()){

            if(snapshot.val().unreadCount > 0){
                            
                firebase.database().ref('chat_history').child(senderId).child(receiverId).child('unreadCount').set(0);
            }           
        }       
    });
}


// to get all user's chat history list
function getChatHistory(){
    //alert('chatHistory');
    let receiverId  = getValue('receiverId');
    var senderId    = getValue('senderId');
    let senderName  = getValue('senderName');
    //alert(receiverId);

    firebase.database().ref("chat_history").child(senderId).on('value', function(snapshot) {
        //alert('heloo');
        var value = snapshot.val();
        $('#chatHistory').html('');
        if(snapshot.val()){
            rdata = arrayshort(snapshot.val());
            var str2 = $.trim($('#searchText').val());
            var str2 = str2.toLowerCase();

            if(str2){
                var rdata = rdata.filter(function(item){
                    userName = (item.name).toLowerCase()
                    return userName.indexOf(str2) != -1;
                });
            }
            $('#chatHistory').html('');
            
            var i = 1;
            $.each(rdata, function(key, value) {
               // var i = 1;
                // firebase.database().ref("users").child(value.uid).once('value', function(snapshot) {
                //     userDetail = snapshot.val();
                //     uName = userDetail.name;
                //     userImg = userDetail.profilePic;
                //     console.log(i);
                //     if(typeof value !== "undefined" || value != null){
                //         var oneMsg = value;
                //         var time = time_ago(oneMsg.timestamp);
                //         let onclick ='onclick="changeChatUser(this)"';
                //         first = (i==1) ? 'first' : '';

                //         // if(value.uid == getValue('receiverId')){
                //         //     updateUnreadStatus();
                //         //     let showCount =  ""; 
                //         //     console.log(1234);
                //         // }else{
                //         //     console.log(12345);
                //         //     let showCount = (oneMsg.unreadCount > 0) ? '<span class="unred_msg">'+oneMsg.unreadCount+'</span>' : ""; 
                //         // }
                //         let showCount = (oneMsg.unreadCount > 0) ? '<span class="unred_msg">'+oneMsg.unreadCount+'</span>' : "";
                //         message = (oneMsg.image == 1) ? 'image' : oneMsg.message;
                //         var htmlData = '<a href="javascript:void(0)" data-token="' + oneMsg.firebaseToken + '" data-uid="' + oneMsg.uid + '" data-name="' + uName + '" data-img="' + userImg + '" '+onclick+' class="'+first+'"><div class="nme-pic-mg"><img src="'+userImg+'" /><div class="nme-msg"> <div class="dsply-inlne-blck cht-tme dsply_block_sec"> <h5 class="dsply-inlne-blck-lft mb-0"> '+oneMsg.name+' </h5><span class="dsply-inlne-blck-rgt dsplay_rgt_time">'+time+'</span></div>'+showCount+'<div class="clearfix"></div><p>'+message+'</p></div> <div> </a>';

                //         //console.log(htmlData);
                //         $('#chatHistory').append(htmlData);

                //         i++;
                //     }
                // });
                
                // console.log(userName);
                // console.log(value.uid);
                
                if(typeof value !== "undefined" || value != null){
                    var oneMsg = value;
                    var time = time_ago(oneMsg.timestamp);
                    let onclick ='onclick="changeChatUser(this)"';
                    first = (i==1) ? 'first' : '';
                   
                    let showCount = (oneMsg.unreadCount > 0) ? '<span class="unred_msg">'+oneMsg.unreadCount+'</span>' : ""; 

                    message = (oneMsg.image == 1) ? 'image' : oneMsg.message;
                    var htmlData = '<a href="javascript:void(0)" data-token="' + oneMsg.firebaseToken + '" data-uid="' + oneMsg.uid + '" data-name="' + oneMsg.name + '" data-img="' + oneMsg.profilePic + '" '+onclick+' class="'+first+'"><div class="nme-pic-mg"><img src="'+oneMsg.profilePic+'" /><div class="nme-msg mt-10"> <div class="dsply-inlne-blck cht-tme dsply_block_sec"> <h5 class="dsply-inlne-blck-lft mb-0"> '+oneMsg.name+' </h5><span class="dsply-inlne-blck-rgt dsplay_rgt_time res_rgt_inlne">'+time+'</span></div>'+showCount+'<div class="clearfix"></div><p>'+message+'</p></div> <div> </a>'

                    $('#chatHistory').append(htmlData);

                    i++;
                }
            });
            if(rdata.length == 0){

                $('#chatHistory').html('<center style="color:#a51d29;" id="noMsg" >No Record Found.</center>');
            }
        }else{
            // alert('no record found');
            if(checkHistory=='me') {

                $('#no-chat-user').show();
                $('#chat-user').hide();
                // hide_loader();
                 $('#tl_front_loader').hide();
            }else{

                $('#no-chat-user').hide();
                $('#chat-user').show();
            }
        }
        // hide_loader();
         $('#tl_front_loader').hide();
    });
} 


function getUpdatedUserData(userId){
    
    firebase.database().ref("users").child(userId).once('value', function(snapshot) { 
        userDetail = snapshot.val();
        setValue('userEditName',userDetail.name);
        setValue('userEditImage',userDetail.profilePic);
    });
}

// to click to change another user for chating
function changeChatUser(e,opponentId='') {
   
    var senderId = getValue('senderId');
    if(opponentId == ""){
        $('#message').show();
        $('.write_bottom').show();

        let name        = $(e).data('name');
        let img         = $(e).data('img') ? $(e).data('img') : defaultUser;
        let receiverId  = $(e).data('uid');
        let token       = $(e).data('token');
        setValue('name',name);
        setValue('img',img);
        setValue('receiverId',receiverId);
        setValue('token',token);

        $('#userinfo').html('<img class="mr-3" src= ' + img + ' id="img'+receiverId+'"><span class="mt-10 ml-10" style="font-size: 18px;color: #fff; display:inline-block;" id="uName'+receiverId+'">' + name + '</span><span id="onlineStatus'+receiverId+'" ></span><span id="userTyping'+receiverId+'" ></span>');

        firebase.database().ref("users").child(receiverId).once('value', function(snapshot) {

            if(snapshot.val()){

                userDetail = snapshot.val();

                // $(".block_data").attr("id", "block_messgae"+userId); 
                // $(".panel-footer").attr("id", "send_msg"+userId);
                //console.log(userDetail);

                let userImg = userDetail.profilePic ? userDetail.profilePic : defaultUser;

                setValue('name',userDetail.name);
                setValue('img',userImg);
                setValue('token',userDetail.firebaseToken);
                setValue('isAvailability',userDetail.availability);

                $("#uName"+receiverId).html(userDetail.name);
                $("#img"+receiverId).attr('src',userImg);

            }
        });

    }else{
        $('#userinfo').html('<img class="mr-3" src="" id="img'+opponentId+'"><span class="mt-10 ml-10" style="font-size: 18px;color: #fff; display:inline-block;" id="uName'+opponentId+'"></span><span id="onlineStatus'+opponentId+'" ></span><span id="userTyping'+opponentId+'" ></span>');

        setValue('receiverId',opponentId);
        if(senderId == opponentId){
            $('#message').hide();
            $('.write_bottom').hide();
        }

        firebase.database().ref("users").child(opponentId).once('value', function(snapshot) {

            if(snapshot.val()){
                userDetail = snapshot.val();
                let userImg = userDetail.profilePic ? userDetail.profilePic : defaultUser;
                setValue('name',userDetail.name);
                setValue('img',userImg);
                setValue('receiverId',opponentId);
                setValue('token',userDetail.firebaseToken);
                setValue('isAvailability',userDetail.availability);

                let receiverId = getValue('receiverId');
                $("#uName"+receiverId).html(userDetail.name);
                $("#img"+receiverId).attr('src',userImg);
            }
        });
    }

    setTimeout(function(){
        if(opponentId==senderId) {  
            $(".first").click();
        }
    }, 3000);

    setTimeout(function(){
        //hide_loader();
        $('#tl_front_loader').hide();
    }, 2000);

    setValue('startFrom',0);

    let receiverId  = getValue('receiverId');

    $(".message_write").attr("id", "send_msg"+receiverId);

    $(".block_data").attr("id", "block_messgae"+receiverId);
    $("#send_msg"+receiverId).hide();

    let chatRoom = (senderId > receiverId) ? receiverId+'_'+senderId : senderId+'_'+receiverId;

    setValue('chatRoom',chatRoom);

    getBlock();
    getAvail();

    $('.message').html('');

    getChat(receiverId);

    $(".message").focus();
    $('.message').val('');
    $('#user_to_user').show();  
    $('#user_to_event').hide();  
}


function getChat(receiverId){


    var senderId    = getValue('senderId');
    let startFrom   = Number(getValue('startFrom'));
    var query = firebase.database().ref("chat_rooms").child(senderId).child(receiverId).limitToLast(15);

    if(startFrom){

        var query = firebase.database().ref("chat_rooms").child(senderId).child(receiverId).orderByChild("timestamp").endAt(startFrom).limitToLast(15);
    }

    query.on('value', function(snapshot) {
        //console.log(snapshot.val());

        var chat = snapshot.val();
        setValue('startFrom',0);

        if(chat){

            if(getValue('startFrom') == 0){

                var keys = Object.keys(chat);
                k = keys[0];

                setValue('startFrom',chat[k].timestamp);
            }

            var page = 1;

            if(getValue('receiverId') == receiverId){

                $.each(chat, function(key, value) {

                    var oneMsg = value;

                    oneMsg.showtimestamp    = moment(oneMsg.timestamp).format('hh:mm A');
                    timestamp               = (oneMsg.timestamp);
                    oneMsg.timestamp        = moment(oneMsg.timestamp).format('YYYY-MM-DD, hh:mm A');

                    let myMsg = (oneMsg.uid != senderId ) ? 'receivr_txt' : 'sendr_txt';
                    let mclass = (oneMsg.uid != senderId ) ? 'pull-left' : 'pull-right';
                    message = (oneMsg.image == 1) ? '<img class="img-cursor" onclick="showImage(this.src);" src=' + oneMsg.imageUrl + ' alt="loading..." height="120" width="130"/>' : oneMsg.message;

                    imgCls = (oneMsg.image == 1) ? 'speech-img' : 'speech';
                    
                    $('#'+timestamp).remove();

                    var msgHtml = '<div class="clearfix '+myMsg+'" id=' +timestamp + '> <div class="'+imgCls+'" data-toggle="tooltip" title="' + oneMsg.timestamp + '"> <p class="text-brk">' + message + '</p>  </div><div class="receivr_time '+mclass+'"> ' + oneMsg.showtimestamp + '</div> </div>';
                    (startFrom == 0) ? $('.message').append(msgHtml) : $('.get_message').append(msgHtml);
                    
                    page++;
                });
            }
            if(page <= 15){
                setValue('startFrom',0);
            }

            if(startFrom == 0){
                $('.csScroll').animate({ scrollTop: $('.csScroll').prop("scrollHeight") }, 0);

            }else{

                var getMsg = $('.get_message').html();
                $('.message').prepend(getMsg);
                $('.get_message').html('');
                $(".csScroll").animate({scrollTop: $(".csScroll").height()}, 1);
            }

        }else{

            $('.message').html('');
        }
        updateUnreadStatus();
    });
}

$('.csScroll').scroll(function() {

    if ($('.csScroll').scrollTop() == 0) {

        if ( getValue('startFrom') != 0 ) {

            receiverId = getValue('receiverId');
            getChat(receiverId);
            
        }
    }
}); 

// to upload image
$("#file-upload").change(function(e) {
    
    var file = e.target.files[0];
    var ext = file.name.split('.').pop().toLowerCase();
    if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
        swal("invalid extension!")
        return false;
    }
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child('chat_photos_LiveWire/' + Date.now()).put(file);
    //show_loader();
    $('#tl_front_loader').show();

    $(".csScroll").animate({scrollTop: $(".csScroll").height()}, 1);

    uploadTask.on('state_changed', function(snapshot) {

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log('Upload is ' + progress + '% done');

        switch (snapshot.state) {

            case firebase.storage.TaskState.PAUSED:

                console.log('Upload is paused');
                break;

            case firebase.storage.TaskState.RUNNING:

                console.log('Upload is running');
                break;
        }

    }, function(error) {

        alert(error)

    }, function() {

        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            sendMsg(downloadURL);
            // hide_loader();
             $('#tl_front_loader').hide();
        });
    });  
        
    $('#file-upload').val('');
});//End

var getBlock = function(){

    let chatRoom    = getValue('chatRoom');
    var senderId    = getValue('senderId');
    let receiverId  = getValue('receiverId');

    firebase.database().ref("block_users").child(chatRoom).on('value', function(snapshot) {

        if (snapshot.exists()) {

            if(snapshot.val().blockedBy == senderId || snapshot.val().blockedBy == "Both"){

                $('#block').hide();
                $('#unblock').show();
                $("#block_messgae"+receiverId).html("You have blocked this user, you can't send messages.");

            }else{

                $('#block').show();
                $("#block_messgae"+receiverId).html("You are blocked by this user, you can't send messages.");
            }

            setValue('isBlock','1');

            $("#block_messgae"+receiverId).show();
            $("#send_msg"+receiverId).hide();

        } else{
            setValue('isBlock','0');

             if(getValue('isAvailability')=='1'){

                $('#unblock').hide();
                $('#block').show();
                $("#send_msg"+receiverId).show();
                $("#block_messgae"+receiverId).hide();
            }
        }
    });
}


var getAvail = function(){

    let receiverId  = getValue('receiverId');

    firebase.database().ref("users").child(receiverId).on('value', function(snapshot) {

        setValue('isAvailability',snapshot.val().availability);


        if (snapshot.val().availability=="0") {

            $("#block_messgae"+receiverId).html("You can't send message as this user is currently unavailable. Please check later.");
            $("#block_messgae"+receiverId).show();
            $("#send_msg"+receiverId).hide();

        } else{
            
            if(getValue('isBlock')!='1'){
                
                $("#send_msg"+receiverId).show();
                $("#block_messgae"+receiverId).hide();
            
            }
        }
    });
}
// for blocking user's
$("#block").click(function(){
   
    let chatRoom = getValue('chatRoom');
    var senderId = getValue('senderId');

    swal({

        title               : "Are you sure?",
        text                : "Blocked user will no longer be able to send you messages and images",
        type                : "warning",
        showCancelButton    : true,
        confirmButtonColor  : '#a51d29',
        confirmButtonText   : 'Yes, I am sure!',
        cancelButtonText    : "No, cancel it!",
        closeOnConfirm      : true,
        closeOnCancel       : true
    },

    function(isConfirm) {
        
        if (isConfirm) {
            $('#unblock').show();
            $('#block').hide();
            firebase.database().ref("block_users").child(chatRoom).once('value', function(snapshot) {

                if (snapshot.exists()) {

                    firebase.database().ref('block_users').child(chatRoom).child('blockedBy').set('Both');

                } else {

                    var blockData = {
                        blockedBy: senderId
                    };
                    firebase.database().ref('block_users').child(chatRoom).set(blockData);
                }
           });
        }
    });
});

// for unblocking user's
$("#unblock").click(function(){
    
    $('#unblock').hide();
    $('#block').show();

    let chatRoom    = getValue('chatRoom');
    var senderId    = getValue('senderId');
    let receiverId  = getValue('receiverId');

    firebase.database().ref("block_users").child(chatRoom).once('value', function(snapshot) {

        var block_id = snapshot.val().blockedBy;
        

        if (block_id == 'Both') {

            block_id = receiverId;
            firebase.database().ref().child('block_users').child(chatRoom).child('blockedBy').set(block_id);

        }else{

            if (block_id == senderId) {

                firebase.database().ref().child('block_users').child(chatRoom).set(null);
            }
        }
    });
});

function delateChat(){

    let receiverId  = getValue('receiverId'); 
    var senderId    = getValue('senderId');
    let senderImg   = getValue('senderImg');

    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this chat",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#a51d29',
        confirmButtonText: 'Yes, I am sure!',
        cancelButtonText: "No, cancel it!",
        closeOnConfirm: true,
        closeOnCancel: true
    },

    function(isConfirm) {

        if (isConfirm) {

            firebase.database().ref('chat_rooms/').child(senderId).child(receiverId).set(null);
            firebase.database().ref('chat_history/' + senderId).child(receiverId).set(null);

        }
    });
}

//for image preview
function showImage(imgPath){
    var modal = document.getElementById('myModal');    
    var modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src        = imgPath;
    var span = document.getElementsByClassName("close-img-modal")[0];
    // When the user clicks on <span>, close the modal
    span.onclick = function() { 
        modal.style.display = "none";
    }
}

// to send notification for app
function senNotifcation(to,notification,data){

    fetch('https://fcm.googleapis.com/fcm/send', {
        'method': 'POST',
        'headers': {
            'Authorization': 'key=' + key,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({

            to: to,                             // receiverId token
            collapse_key: 'your_collapse_key',
            delay_while_idle : false,
            priority : "high", 
            content_available: true,
            notification: notification,         // data dictionary      
            data: data,                         // data dictionary   
            badge : 1,
            icon : 'icon',
        })

    }).then(function(response) {

        // console.log(response);

    }).catch(function(error) {

        console.error(error);
    });
}

function getWbNotification(){

    firebase.database().ref("webNotification").child(senderId).on('value', function(snapshot) {
        var value = snapshot.val();
        $.each(value, function(key, value) {
            let receiverId   = getValue('receiverId');
            if(receiverId == value.opnId){
                firebase.database().ref("webNotification").child(senderId).child(key).set(null);
            }else{
                getWebNtification34(value.body,value.title,value.url);
                firebase.database().ref("webNotification").child(senderId).child(key).set(null);
            }
        });
    });
}getWbNotification();

Notification.requestPermission();
function getWebNtification34(theBody,theTitle,URL) {
    var options = {
        icon: BASE_URL+'frontend_asset/images/logo2.png',
        body: theBody,
    }
    var notification = new Notification(theTitle, options);
    notification.onclick = function(event) {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.location.href = URL; 
    }
    setTimeout(notification.close.bind(notification), 8000);
}
//End push notification

// to send web to web notification
function senWebNotifcation(userId,data){

    firebase.database().ref("webNotification").child(userId).push(data);
}

// var reciveIdRef = firebase.database().ref().child(notifications).child(senderId);
//     reciveIdRef.on("value",getNotiData);

function getNotiData(rdata){

    var rdata = rdata.val();

    if(rdata){

        var keys = Object.keys(rdata);

        for (var i = 0; i < keys.length; i++) {

            var k       = keys[i];
            var message = rdata[k].body;
            var title   = rdata[k].title;
            var url     = rdata[k].url;

            notifyBrowser(title, message, url);

            firebase.database().ref().child(notifications).child(senderId).child(k).set(null);
        }
    }
}

function notifyBrowser(title, desc, url) {

    if (!Notification) {

        console.log('Desktop notifications not available in your browser..');
        return;
    }

    if (Notification.permission !== "granted") {

        Notification.requestPermission();

    } else {

        var notification = new Notification(title, {
            icon: BASE_URL+'frontend_asset/images/logo2.png',
            body: desc,
        });

        notification.onclick = function() {

            window.open(url);
        };

        notification.onclose = function() {

            console.log('Notification closed');
        };
    }
}