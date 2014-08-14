    var optionCounter=0; var uniquePhotoCount=0; var photos = []; var WickedIndex;  var options = [];
    var tImgID;
    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

function option(){
  optionText="";
  containsImg=0;
  counterNum=-1;
}
function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

window.HomeView = Backbone.View.extend({

    template:_.template($('#home').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.loginPageView = Backbone.View.extend({

    template:_.template($('#loginPage').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.registerPageView = Backbone.View.extend({
    template:_.template($('#registerPage').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.contactsPageView = Backbone.View.extend({
    template:_.template($('#contactsPage').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }    
});

window.createPollView = Backbone.View.extend({
    template:_.template($('#createPoll').html()),


    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.sendToView = Backbone.View.extend({
    template:_.template($('#sendToPage').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.personalFeedView = Backbone.View.extend({
    template:_.template($('#personalFeed').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.chartView = Backbone.View.extend({
    template:_.template($('#chart').html()),
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.settingsView = Backbone.View.extend({
    template:_.template($('#settings').html()),
     render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }   
});

window.listFriendsView = Backbone.View.extend({
    template:_.template($('#listFriends').html()),
     render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }   
});

window.listInstasView = Backbone.View.extend({
    template:_.template($('#instaPage').html()),
     render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }   
});

window.searchView = Backbone.View.extend({
    template:_.template($('#search').html()),
     render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }   
});

window.makeGroupsView = Backbone.View.extend({
    template:_.template($('#makeGroupsPage').html()),
     render:function (eventName) {
        $(this.el).html(this.template());
        return this;
     }
})

var AppRouter = Backbone.Router.extend({

    routes:{
        "":"home",
        "loginPage":"loginPage",
        "registerPage":"registerPage",
        "contactsPage":"contactsPage",
        "createPoll":"createPoll",
        "sendToPage":"sendToPage",
        "personalFeed":"personalFeed",
        "chart":"chart",
        "settings":"settings",
        "listFriends":"listFriends",
        "instaPage":"instaPage",
        "search":"search",
        "makeGroupsPage":"makeGroupsPage"
    },

    initialize:function () {
        // Handle back button throughout the application
        $('.back').on('click', function(event) {
            console.log("back clicked");
            window.history.back();
            window.location.reload();
            return false;
        });
        this.firstPage = true;
    },

    home:function () {
        console.log('#home');
        this.changePage(new HomeView());
    },

    loginPage:function () {
        console.log('#loginPage');
        this.changePage(new loginPageView());   

        var shit= document.getElementById("loginPageContent");
        var hammertime = new Hammer(shit);
        hammertime.on('swipeleft', function(ev) {
            console.log("left");
        });
        hammertime.on("swiperight", function(ev){
            console.log("right");
            window.location.hash="";
        });
     /*   $("#loginPageContent").touchwipe({
             wipeLeft: function() {
                console.log("left"); 
                },
             wipeRight: function() { 
                console.log("right");
                window.location.hash = "";
                },
             wipeUp: function() { 
                console.log("up"); 
            },
             wipeDown: function() { 
               console.log("down"); 
             },
             min_move_x: 20,
             min_move_y: 20,
             preventDefaultEvents: false
    });  */


//i put all this login form function stuff
$("#loginForm").on("submit", function(e){
        $("#submitButton",this).attr("disabled","disabled");
        var w=windowWidth/2;
        var h=windowHeight/2;
        var loadIsh='<div id="loadIsh" style="width:'+w+'px;top:'+h+'px;"><img id="theLoadingPic" src="img/ajax-loader.gif"></div>';
        $("#loginPageContent").append(loadIsh);
        var u = $("#username",this).val();
        var p = $("#password",this).val();
        //document.write(u);
        //document.write(p);
        if(u!='' && p!=''){
            $.post("https://web.engr.illinois.edu/~chansky2/login.php",{username:u,password:p},function(res){ 
                //window.alert(res);    
                if(res[1]==='t'){
                    //$(":mobile-pagecontainer").pagecontainer("change","some.html",{transition:"slide"},false);
                    //window.alert("success");
                            //createPoll();
                            //$(document).changePage(new createPollView());
                            //this.$el.html(new createPollView());
                            window.location.hash="createPoll";  //this line is a f'n miracle
                           // window.alert("created create poll page");
                         
                }
                else{
                    //avigator.notification.alert("Your login failed",function(){});
                    window.alert("incorrect username or password");
                    location.reload();
                }
                $("#submitButton").removeAttr("disabled");

            });
        }
        else{
            window.alert("username or password is missing");
            location.reload();
        }
        return false;

    });
    //window.alert("end of login form");
//end of login form function stuff

    },

    registerPage:function(){
        console.log('#registerPage');
        this.changePage(new registerPageView());   
       // register();

        var shit= document.getElementById("regPageContent");
        var hammertime = new Hammer(shit);
        hammertime.on('swipeleft', function(ev) {
            console.log("left");
        });
        hammertime.on("swiperight", function(ev){
            console.log("right");
            window.location.hash="";
        });
     /*   $("#regPageContent").touchwipe({
             wipeLeft: function() {
                console.log("left"); 
                },
             wipeRight: function() { 
                console.log("right");
                window.location.hash = "";
                },
             wipeUp: function() { 
                console.log("up"); 
            },
             wipeDown: function() { 
               console.log("down"); 
             },
             min_move_x: 20,
             min_move_y: 20,
             preventDefaultEvents: false
    }); */

         $("#registerForm").on("submit",function(e){
            //window.alert("register clicked");
            console.log("register clicked");
        //$("$registerButton",this).attr("disabled","disabled");
        //document.write("inside register");
        var w=windowWidth/2;
        var h=windowHeight/2;
        var loadIsh='<div id="loadIsh" style="width:'+w+'px;top:'+h+'px;"><img id="theLoadingPic" src="img/ajax-loader.gif"></div>';
        $("#regPageContent").append(loadIsh);

        e.preventDefault();
//            var PUSHAPPS_APP_TOKEN="5ebcbd9a-8583-446e-81ee-f19e339fa88e";
  //          var YOUR_GOOGLE_PROJECT_ID="75213574961";
//            var theToken;
  //          var deviceID;
            var g = $("#Reggender").val();
            var ph = $("#Regphonenumber").val();
            var em = $("#Regemail",this).val();
            var u = $("#Regusername",this).val();
            var p = $("#Regpassword",this).val();
            var a = $("#Regage",this).val();
            registerHelper(g, ph, em, u, p, a);
            //e.preventDefault();
           // theRegisterPost(theToken, deviceID, g, ph, em, u, p, a);
           // window.alert("about to call register device");
            //e.preventDefault();
/*PushNotification.registerDevice(YOUR_GOOGLE_PROJECT_ID, PUSHAPPS_APP_TOKEN, function (pushToken) {
                                        //window.alert("My push token: " + pushToken);
                                        if(!theToken)
                                            theToken=pushToken;
                                        //e.preventDefault();
                                       // theRegisterPost(theToken, deviceID, g, ph, em, u, p, a);
                                    },
                                    function (error) {
                                        window.alert("error call back about to follow");
                                        window.alert(error);
                                    });
            //window.alert("called getToken function");
                for(var i=0; i<100000; i++){
                    //do nothing
                    if(i==99999)
                        console.log("finished first round of doing nothing");
                }
PushNotification.getDeviceId(function (deviceId) {
                                       // window.alert("Your device ID: " + deviceId);
                                    if(theToken){
                                        if(!deviceID)
                                            deviceID=deviceId;
                                        e.preventDefault();
                                        theRegisterPost(theToken, deviceID, g, ph, em, u, p, a);
                                    }
                                    else{
                                        console.log("token still not set");
                                        setTimeout(function(){
                                           PushNotification.getDeviceId(function (deviceId)); 
                                        }, 1000);
                                    }
                                    },
                                    function (error) {
                                        window.alert(error);
                                    });
//window.alert("called device ID fn");
                for(var i=0; i<10000; i++){
                    //do nothing
                    if(i==9999)
                        console.log("finished second round of doing nothing");
                }*/
/*document.addEventListener('pushapps.message-received', function(event) {
                                var notification = event.notification;
                                // This is the entire object, just take the wanted propertey
                             //   window.alert(notification);
                              });  */

                                       // theRegisterPost(theToken, deviceID, g, ph, em, u, p, a);

    
    });
    //return false;
   // window.alert("end of reg submission");

    },

    contactsPage:function(){
        console.log('#contactsPageView');
        this.changePage(new contactsPageView()); 

        var w=windowWidth/2;
        var h=windowHeight/2;
        var loadIsh='<div id="loadIsh" style="width:'+w+'px;top:'+h+'px;"><img id="theLoadingPic" src="img/ajax-loader.gif"></div>';
        $("#contactsPageContent").append(loadIsh);

        var contactOptions = new ContactFindOptions();   //this used to be var options =... but i changed it
        contactOptions.filter = "";
        contactOptions.multiple = true;
        var fields = ["displayName","phoneNumbers"];
        console.log("about to call find contacts");
        navigator.contacts.find(fields, onSuccess, onError, contactOptions);      
        var loaded = false;
        var pnums = [];  

        function onSuccess(contacts) {
            console.log("Success, found contacts");
            for(var i=0; i<contacts.length; i++){
                if(contacts[i].displayName){
                    if(contacts[i].phoneNumbers != null){
                        for(var j=0; j<contacts[i].phoneNumbers.length; j++){
                            pnums.push(parsenum(contacts[i].phoneNumbers[j].value));
                        }
                    }
                }
            }

            var usernames = [];
            var fullnames = []; 
            console.log("about to make the post request part of find contacts");
             $.post("https://web.engr.illinois.edu/~chansky2/findContacts.php",{phonenumbers:pnums},function(res){
               // window.alert(res);
                $("#loadIsh").remove(); //removes the laoding icon
               console.log("find contacts php returned: "+res);
               if(res!="No"){  //never have tested this case (i'd need a phone who doesn't have my #)
                    var obj = jQuery.parseJSON(res);   //or i'd have to remove my # from the DB
                    //window.alert(obj);
                    for(var i=0; i<obj.length; i++){
                        usernames.push(obj[i].username);
                       // fullnames.push(obj[i].fullname);
                    }

                    $("#frame").html('<fieldset id="contactsCheckboxes" data-role="controlgroup"><legend>Select who you want to follow:</legend></fieldset>');
                    for(var i=0; i<usernames.length; i++){
                        //document.write(contacts[i].phoneNumbers.length)
                            $("fieldset").append('<input type="checkbox" name="' + usernames[i] + '" id="id' + i + '"><label for="id' + i + '">' + usernames[i] + '</label>');
                    }   
                    $("#frame").trigger("create");
                    loaded = true;
                }
                else{
                    window.location.hash="createPoll";
                }
             });
        }


    },

    createPoll:function () {
        console.log('#createPoll');
       // window.alert("in create poll function");
        this.changePage(new createPollView());  //inserts the view into the dom
        options=[]; photos=[]; //hopefully this doesn't screw things up, added 7-28-14
     /*   $(document).on("tap", "#add-option-button", function(e){
            e.preventDefault();
            window.alert("Adding option");
            var field=document.getElementById("add-option-text");
            console.log("yoooooo: "+$(field).val());
            tImgID="tmppic"+optionCounter;
            var option_text = $("#add-option-text").val();
            var tempObj= new option();
            tempObj.optionText=option_text;
            tempObj.containsImg=0;
            tempObj.counterNum=optionCounter;       
            options.push(tempObj); 
            window.alert("option text: "+option_text);  
            if(option_text !== ''){
                $("#options-list").append('<li id="'+optionCounter+'"><div class="ui-grid-b"><div class="ui-block-a" style="width: 30%;"><div data-role="fieldcontain"><a id="'+optionCounter+'" href="#createPoll" class="btn btn-lg btn-success" data-toggle="modal" data-target="#basicModal"><span class="ui-btn-inner ui-btn-corner-all"><img style="width:60px;height:60px;" src="img/default_pic.png" id="'+tImgID+'"></span></a></div></div><div class="ui-block-b" style="width: 60%;"><div data-role="fieldcontain"><h2 id="otext">'+ option_text +'</h2></div></div><div class="ui-block-c" style="width: 6%; padding-top: 10px; float: right;"><div style="float: right;"><input type="button" id="remove-option-button" value="remove"/></div></div></div></li>').listview("refresh");          
                $("#add-option-text").val("");
            }
            else{
                navigator.notification.alert("Nothing to add!",function(){});
            }
            $("#createPoll").trigger("create");
              optionCounter++;

        }); */
    //do your stuff
            var shit= document.getElementById("createPollContent");
            var hammertime = new Hammer(shit);
            hammertime.get('swipe').set({direction: Hammer.DIRECTION_HORIZONTAL});
        //hammertime.defaults.behavior.touchAction = 'pan-y';
            hammertime.on("swiperight", function(){
                console.log("right");
                window.location.hash="personalFeed";
            });
            hammertime.on("swipeleft", function(){
                console.log("left");
                window.location.hash="settings";
            });
            /*
            hammertime.on("swipedown", function(e){
                  //  e.preventDefault();
                    console.log("swiped down");
            });
            hammertime.on("swipeup", function(e){
                //e.preventDefault();
                console.log("swiped up");
            });   */

      /*  $("#createPollContent").touchwipe({
            //i have a choice here as to whether or not i want to save the user's unpublished poll 
            //upon a swipe...for now im not
             wipeLeft: function() {
                console.log("left"); 
                optionCounter=0;
                options=[];
                photos=[];
              window.location.hash = "settings";
                },
             wipeRight: function() { 
                console.log("right");
                optionCounter=0;
                options=[];
                photos=[];
                window.location.hash ="personalFeed";
                 },
             wipeUp: function() { 
                console.log("up"); 
            },
             wipeDown: function() { 
               console.log("down"); 
             },
             min_move_x: 20,
             min_move_y: 20,
             preventDefaultEvents: false
    });  */
            $("#add-option-button").on("tap", function(){

            //e.preventDefault();
          //  window.alert("Adding option");
            var field=document.getElementById("add-option-text");
            console.log("yoooooo: "+$(field).val());
            tImgID="tmppic"+optionCounter;
            var option_text = $("#add-option-text").val();
            var tempObj= new option();
            tempObj.optionText=option_text;
            tempObj.containsImg=0;
            tempObj.counterNum=optionCounter;       
            options.push(tempObj); 
          //  window.alert("option text: "+option_text);  
            if(option_text !== ''){
                $("#options-list").append('<li id="'+optionCounter+'"><div class="ui-grid-b"><div class="ui-block-a" style="width: 30%;"><div data-role="fieldcontain"><a id="'+optionCounter+'" href="#createPoll" class="btn btn-lg btn-success" data-toggle="modal" data-target="#basicModal"><span class="ui-btn-inner ui-btn-corner-all"><img style="width:60px;height:60px;" src="img/default_pic.png" id="'+tImgID+'"></span></a></div></div><div class="ui-block-b" style="width: 60%;"><div data-role="fieldcontain"><h2 id="otext">'+ option_text +'</h2></div></div><div class="ui-block-c" style="width: 6%; padding-top: 10px; float: right;"><div style="float: right;"><input type="button" id="remove-option-button" value="remove"/></div></div></div></li>').listview("refresh");          
                $("#add-option-text").val("");
                optionCounter++;
            }
            else{
                window.alert("Nothing to add!",function(){});
            }
            $("#createPoll").trigger("create");

        });
        $('#options-list').on('click', '#remove-option-button', function(event) {
            console.log("remove clicked on");
            tImgID="tmppic"+(optionCounter);  //used to be -1
            event.preventDefault();
            var removalIndex=$(this).parent().parent().parent().parent().attr('id');
            console.log("removing (aka removal index): "+removalIndex+", and optionCounter is: "+optionCounter);
            console.log("options size before remove: "+options.length);
            //im thinking if i add a for loop to go through the options array and find the option with the 
            //matching id then thats my true removal index!
            var trueRemovalIndex=-1;
            for(var i=0; i<options.length; i++){
                if(options[i].counterNum==removalIndex)
                    trueRemovalIndex=i;
            }
            console.log("true removal index is: "+trueRemovalIndex);
            options.splice(trueRemovalIndex, 1);  //actually removes the option from the options array
           // optionCounter--;  //this is bad because it leads to li's with the same id
            console.log("options size after removal: "+options.length+" and optionCounter is: "+optionCounter);
            console.log("photos length is: "+photos.legnth+", and uniquePhotoCount is: "+uniquePhotoCount);
            var i=0;
            var helperFlag=0;
            for(var x in photos){
                    if(photos.hasOwnProperty(x)){
                        if(i==trueRemovalIndex)
                            helperFlag=1;
                        i++;
                    }
            }
            console.log("the length of photos pre-remove is: "+i);
            if(helperFlag==1){
                photos.splice(trueRemovalIndex, 1);
                //delete photos[trueRemovalIndex];
                uniquePhotoCount--;
                console.log("new length of photos is: "+photos.length);
            }

           /* if(removalIndex<=uniquePhotoCount){  //REVIEW
                if(photos.length>0){
                    console.log("length of photos is: "+photos.length);
                    console.log("removal index was less than uniquePhotoCount which was: "+uniquePhotoCount);
                    photos.splice(removalIndex, 1);
                    console.log("new length of photos is: "+photos.length);
                    uniquePhotoCount--;
                }
            } */
           $(this).parent().parent().parent().parent().remove();

        });
        $("#sendTo").on("tap",function(e){
            console.log("# options being sent: "+options.length);
         e.preventDefault();
        });
        $('#options-list').delegate('li', 'vclick', function() {
            console.log("the list item clicked was: "+this.id);
            WickedIndex = this.id;
         });
    },

    sendToPage:function(page){
        console.log('#sendToPage');
        this.changePage(new sendToView());  //inserts the view into the dom

        var w=windowWidth/2;
        var h=windowHeight/2;
        var loadIsh='<div id="loadIsh" style="width:'+w+'px;top:'+h+'px;"><img id="theLoadingPic" src="img/ajax-loader.gif"></div>';
        $("#contentStuff").append(loadIsh);

        var shit= document.getElementById("contentStuff");
        var hammertime = new Hammer(shit);
        hammertime.on('swipeleft', function(ev) {
                console.log("left"); 
                window.location.hash = "createPoll";
        });
        hammertime.on("swiperight", function(ev){
                console.log("right");
                window.location.hash = "createPoll";
        });


        var contacts = [];
        var fullNames= [];
        var groupNames=[];

        $.get("https://web.engr.illinois.edu/~chansky2/buildGroup.php", function(data){
            console.log("data is: "+data);
            var obj = jQuery.parseJSON(data);            
            console.log("parsed obj is: "+obj);
            console.log("obj at 0 is: "+obj[0]);
            console.log("length of obj is: "+obj.length);
            for(var i = 0; i < obj.length; i++) {
              if(jQuery.inArray(obj[i], groupNames)==-1)  //to prevent duplicates
                console.log("obj at: "+i+" is: "+obj[i]+"\n");
                groupNames.push(obj[i].gn);     
            }
            $("#sendToFrame").append('<fieldset id="groupNameCheckBoxes" data-role="controlgroup"><legend>Groups</legend></fieldset>');
            for (var i = 0; i < groupNames.length; i++) {
                $("#groupNameCheckBoxes").append('<input type="checkbox" name="' + groupNames[i] + '" id="id' + i + '"><label for="id' + i + '">' + groupNames[i] + '</label>');
            }
            $("#sendToFrame").trigger("create");
        });
        $.get("https://web.engr.illinois.edu/~chansky2/getFriends.php", function(data){
            var obj = jQuery.parseJSON(data);
            for(var i = 0; i < obj.length; i++) {
              if(jQuery.inArray(obj[i].username, contacts)==-1)  //to prevent duplicates
                contacts.push(obj[i].username);     
            }
            $("#sendToFrame").append('<fieldset id="sendToCheckboxes" data-role="controlgroup"><legend>Friends</legend></fieldset>');
            for (var i = 0; i < contacts.length; i++) {
                $("#sendToCheckboxes").append('<input type="checkbox" name="' + contacts[i] + '" id="id' + i + '"><label for="id' + i + '">' + contacts[i] + '</label>');
            }
            $("#loadIsh").remove(); //removes the laoding icon
            $("#sendToFrame").trigger("create");
        });  
    },

    personalFeed:function(page){
        console.log('#personalFeed');
        this.changePage(new personalFeedView());

     /*     console.log("dataLength is: "+dataLength);
          for(var i=0; i<dataLength; i++){
            var input="."+i;
            $(input).TimeCircles().start();
          }  */
        var usernames=[];
        var PID=[];
        var dataLength=0;
        var endtime=[];
        var timeRemaining=[];
        if(feedVisited==0){  //just added for control of reload
            console.log("feedVisited was 0 so we got data");
            getFeedData();
            feedVisited=1;
        } //just added for control of reload
        else{  //we already have feed data (and its in localStorage)
            var endtime=jQuery.parseJSON(localStorage.getItem("endtimeArr"));
            var usernames=jQuery.parseJSON(localStorage.getItem("userArr"));
            var timeRemaining=jQuery.parseJSON(localStorage.getItem("timeRemainingArr"));
            console.log("first endtime: "+endtime[0]);
            dataLength=usernames.length;
            displayFeed();
        }
      
        var shippar2=document.getElementById("personalFeedContent");
        var specialHam2= new Hammer(shippar2);
        specialHam2.get('swipe').set({direction: Hammer.DIRECTION_HORIZONTAL});
          specialHam2.on('swipeleft', function() {
          console.log("left"); 
          console.log("Stopping timeCircles and dataLength is: "+dataLength);
          for(var i=0; i<dataLength; i++){
            if(timeRemaining[i]>=0){
                var input="."+i;
                $(input).TimeCircles().stop();
            }
          }
          window.location.hash = "createPoll";
        });
        specialHam2.on("swiperight", function(){
            console.log("right");
        });   
      /*  $("#personalFeedContent").touchwipe({
         wipeLeft: function() {
          console.log("left"); 
          window.location.hash = "createPoll";
            },
         wipeRight: function() { 
            console.log("right");
             },
         wipeUp: function() { 
            console.log("up"); 
            //feedVisited=0;
            $('#feedList').empty();
            resetFeedArrays();
            getFeedData();
        },
         wipeDown: function() { 
           console.log("down"); 
         },
         min_move_x: 20,
         min_move_y: 20,
         preventDefaultEvents: false
        }); */

        $('#feedList').delegate('li', 'vclick', function() {
            var index = $(this).index();
            var selectedIndex="selectedIndex";
            window.localStorage.setItem(selectedIndex, $(this).index());  //i added this semi colon july 9th
           console.log("Stopping timeCirlces and dataLength is: "+dataLength);
          for(var i=0; i<dataLength; i++){
            if(timeRemaining[i]>=0){
                var input="."+i;
                $(input).TimeCircles().stop();
            }
          }
            window.location.hash="chart";
        });
         $("#refreshPersonalFeed").on("tap", function(){
            console.log("refreshing feed");
            console.log("Stopping timeCircles and dataLength is: "+dataLength);
            for(var i=0; i<dataLength; i++){
              if(timeRemaining[i]>=0){
                    var input="."+i;
                    $(input).TimeCircles().stop();
                }
            }
            $('#feedList').empty();
            resetFeedArrays();
            getFeedData();            
        });

        function getFeedData(){
            $.get("https://web.engr.illinois.edu/~chansky2/personalFeed.php",function(data){
               // console.log("data: "+data);
                if(data!= null && data!==undefined){    //VERY CRAPPY NULL CHECKER....
                    var obj = jQuery.parseJSON( data );
                    for(var i = 0; i < obj.length; i++) {
                        usernames.push(obj[i].username);
                        PID.push(obj[i].PID);
                        endtime.push(obj[i].endtime);
                        timeRemaining.push(obj[i].timeRemaining);
                    }
                    dataLength=usernames.length;
                    displayFeed();
                    var userArr="userArr";
                    var endtimeArr="endtimeArr";
                    var p_idArr= "p_idArr";
                    var timeRemainingArr="timeRemainingArr";
                    if(typeof(window.localStorage) != 'undefined'){ 
                        window.localStorage.setItem(userArr, JSON.stringify(usernames));
                        window.localStorage.setItem(endtimeArr, JSON.stringify(endtime));
                        window.localStorage.setItem(p_idArr, JSON.stringify(PID));
                        window.localStorage.setItem(timeRemainingArr, JSON.stringify(timeRemaining));
                    } 
                    else{ 
                        console.log("store FAILED");
                        throw "window.localStorage, not defined"; 
                    }
                }
                else{
                    var word="NO FOLLOWERS";
                    $('#feedList').append('<li><a href="">' + word + '</a></li>').listview('refresh');
                }
            });  //this is clsing the get!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    
        }

        function displayFeed(){
            console.log("displayFeed called");
            for (var j = 0; j < dataLength; j++) {   //not sure why this needs to be in the get
                //var generic="display:inline-block; height:18%; margin:10px";
                var clock="display:inline-block; width:100%; height:20%;";
                var helperText="'s poll ends in: ";
                //going to calculate time differences to avoid looking at phone's timezone
          /*      var d = new Date();
                var seconds = d.getUTCSeconds();
                var minutes = d.getUTCMinutes();
                var hour = d.getUTCHours();
                var year = d.getUTCFullYear();
                var month = d.getUTCMonth()+1; // beware: January = 0; February = 1, etc.  //need +1 b/c of php
                var day = d.getUTCDate();
                var tempDate=year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds;
                var date2=new Date(endtime[j]);
                var date1=new Date(tempDate);
                var timeDiff = date2.getTime() - date1.getTime();  //Math
                timeDiff=timeDiff/1000;
                console.log("time difference is: "+timeDiff);
                if(timeDiff<=0){
                    //helperText="'s poll disappears in: ";
                    helperText="'s poll has ended (but can still be viewed)";
                } */
                var timeDiff=timeRemaining[j];
                //console.log("timeDiff is: "+timeDiff);
                if(timeDiff<=0){
                    //helperText="'s poll disappears in: ";
                    helperText="'s poll has ended (but can still be viewed)";
                }

                var phrase='<li><a><h2>'+usernames[j]+helperText+'</h2><div class="'+j+'", data-timer="'+timeDiff+'", style="'+clock+'"></div></a></li>';
                $('#feedList').append(phrase).listview('refresh');
                //add the time circle for each row:
                //console.log("endtime for item "+j+", is: "+endtime[j]);
                if(timeDiff>0){
                    var input="."+j;
                    $(input).TimeCircles({ "animation": "smooth",
                    "bg_width": 1.2,
                    "fg_width": 0.1,
                    "circle_bg_color": "#60686F", "count_past_zero": false, "time": {
                    "Days": {
                        "text": "Days",
                        "color": "#FFCC66",
                        "show": true
                    },
                    "Hours": {
                        "text": "Hours",
                        "color": "#99CCFF",
                        "show": true
                    },
                    "Minutes": {
                        "text": "Minutes",
                        "color": "#BBFFBB",
                        "show": true
                    },
                    "Seconds": {
                        "text": "Seconds",
                        "color": "#FF9999",
                        "show": true
                    }
                    }});
                }
                //$(input).TimeCircles({total_duration: "Minutes"}).rebuild();

            }
                            $('#feedList').trigger('create');

                $('#feedList').listview('refresh');
        }

        function resetFeedArrays(){
            usernames=[];
            PID=[];
            dataLength=0;
            endtime=[];
            timeRemaining=[];
        }
        
    },

    chart:function(page){
        console.log('#chartView');
        this.changePage(new chartView());

        var w=windowWidth/2;
        var h=windowHeight/2;
        var loadIsh='<div id="loadIsh" style="width:'+w+'px;top:'+h+'px;"><img id="theLoadingPic" src="img/ajax-loader.gif"></div>';
        $("#chartContent").append(loadIsh);
        console.log("appended loadIsh");
    //do your stuff
        var shit= document.getElementById("chartContent");
        var hammertime = new Hammer(shit);
        hammertime.get('swipe').set({direction: Hammer.DIRECTION_HORIZONTAL});
       // hammertime.defaults.behavior.touchAction = 'pan-y';
        hammertime.on('swipeleft', function() {
            console.log("left");
        });
        hammertime.on("swiperight", function(){
            console.log("right");
            window.location.hash="personalFeed";
        });
      
        var Over=0;
        var GenerateChart=0;
        var index=(localStorage.getItem("selectedIndex"));
        var pIDs = jQuery.parseJSON(localStorage.getItem("p_idArr"));
        var pid=pIDs[index];
        var pollTitle = "What should I get to eat?";
        var options = [];
        var votes = [];
        var cIDs = [];
        var prevVote = null;
        var isPics =[];
        $.post("https://web.engr.illinois.edu/~chansky2/getPollInfo.php",{pid:pid},function(res){ 
            var obj = jQuery.parseJSON(res);
            pollTitle=obj[0].textt;  //because the first item in the returned array is just the poll text
            Over=obj[1].numvotes;
            prevVote=obj[1].choiceID;
            $("#loadIsh").remove(); //removes the laoding icon
            if(Over==1){
                console.log("the poll has ended");
                //window.alert("the poll has ended");
            }
            for(var i =2; i<obj.length; i++){
                options.push(obj[i].textt);
                votes.push(obj[i].numvotes);
                cIDs.push(obj[i].choiceID);
                isPics.push(obj[i].pic);
            }

            displayOptions();
            buildChart();
            $('#container').trigger("create");
        });  //close post up here

        function displayOptions(){
                for (var i = 0; i < options.length; i++) {
                var id = 'radio-choice-' + i;
                label = options[i];
                value = options[i];
                if(isPics[i]==1){
                    var secondPhrase='<div id="'+id+'"><label style="display:inline-block;" for="'+id+'">'+label+'<a href="#'+id+'pop" data-rel="popup" data-position-to="window"><img class="pictureHelper" id="thumbnailImage" style="display:inline-block;width:60px;height:60px;padding-left: 10px;" src="https://web.engr.illinois.edu/~chansky2/uploads/'+cIDs[i]+'.jpg" for="'+id+'"></a><div data-role="popup" id="'+id+'pop"><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><img src="https://web.engr.illinois.edu/~chansky2/uploads/'+cIDs[i]+'.jpg" style="width:800px;height:500px;" ></label><input type="radio" name="radio-choice" id="'+id+'" value="'+value+'"></div></div>';
                }
                else{ //no pic
                    var secondPhrase='<div id="'+id+' style="margin:10px"><label style="display:inline-block;" for="'+id+'">'+label+'</label><input type="radio" name="radio-choice" id="'+id+'" value="'+value+'"></div>';
                }
                $("fieldset").append(secondPhrase);
            }
        }
            var totalVotes = 0;
            displayOptions();
            var counter=0;
            $("#frame").trigger("create");
            $('#myFieldset').delegate('div', 'vclick', function() {
                WickedIndex = this.id;
                var item="#"+this.id+"pop";
                $(item).popup('open');
            });
            $(document).on('tap', '.pictureHelper', function() {
                window.alert("pic clicked");
                var important_index=-1;
                for(var i=0; i<10; i++){  //try to find corresponding popup
                   var tID="https://web.engr.illinois.edu/~chansky2/uploads/"+cIDs[i]+".jpg";
                    if((this.src).localeCompare(tID)==0){ //found the index of the image
                        important_index=i;
                        break;
                    }
                }
                var tPop="#radio-choice-"+important_index+"pop";
                window.alert(tPop);
                 $(tPop).popup('open');
                 window.alert("pop up opened");
            }); 
            $("#thumbnailImage").on("tap",function(e) {
                var important_index=-1;
                for(var i=0; i<10; i++){  //try to find corresponding popup
                   var tID="https://web.engr.illinois.edu/~chansky2/uploads/"+cIDs[i]+".jpg";
                    if((this.src).localeCompare(tID)==0){ //found the index of the image
                        important_index=i;
                        break;
                    }
                }
                var tPop="#radio-choice-"+important_index+"pop";
                $(tPop).popup('open');
            });  

            $('#frame input').on('change', function () {
                if (prevVote !== null&&prevVote!=0) {
                    var i = 0;
                    while (i < options.length) {
                        if (options[i] === prevVote) break;
                        i++;
                    }
                    if(Over==0){
                        cID=cIDs[i];
                        votes[i]--;
                        totalVotes--;
                        var typeSent="change";
                        $.post("https://web.engr.illinois.edu/~chansky2/changeVote.php",{type:typeSent, choice_id:cID, thePoll:pid}, function(res){
                            if(res==1){ //the poll is closed
                                closePoll();
                            }
                        });
                    }  //close over
                }
                prevVote = $('input[name="radio-choice"]:checked', '#frame').val();
                var tempIndex=-1;
                var cID=-1;
                for(var j=0; j<options.length; j++){
                    if(prevVote===options[j]){  //that means we've found the index of the option that was selected
                        cID=cIDs[j];
                    }
                }
                if(Over==0){
                var typeSent="add";
                    $.post("https://web.engr.illinois.edu/~chansky2/changeVote.php",{type:typeSent, choice_id:cID, thePoll:pid}, function(res){
                        if(res==1){ //the poll is closed
                            closePoll();
                        }
                    });
                }  //close over
                var j = 0;
                while (j < options.length) {
                    if (options[j] === prevVote) break;
                    j++;
                }
                votes[j]++;
                totalVotes++;
                percentages = [];
                best = -1;
                for (var a = 0; a < votes.length; a++) {
                    percentages[a] = votes[a] / totalVotes;
                    if (percentages[a] > best) {
                        best = percentages[a];
                    }
                }
                ser = generateData(options, percentages);
                $('#container').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: pollTitle
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Percentage',
                        data: ser
                    }]
                });
            });  //closes the frame on change fn

            function buildChart(){
                console.log("Over value: "+Over+", and GenerateChart value: "+GenerateChart);                
                if(Over==0||GenerateChart==0){
                    for (var i = 0; i < votes.length; i++) {
                        totalVotes += votes[i];
                    }
                    var percentages = [];
                    var best = -1;
                    for (i = 0; i < votes.length; i++) {
                        percentages[i] = votes[i] / totalVotes;
                        if (percentages[i] > best) {
                            best = percentages[i];
                        }
                    }
                    var ser = [];
                    GenerateChart=1;
                    ser = generateData(options, percentages);
                }

     Highcharts.getOptions().plotOptions.pie.colors = (function () {
                    var colors = [],
                    base = Highcharts.getOptions().colors[Math.floor((Math.random() * 10))],
                    i;
                    for (i = 0; i < options.length; i++) {
                        colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
                    }
                    return colors;
                }());


                // Build the chart
                $('#container').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: pollTitle
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Percentage',
                        data: ser
                    }]
                });
            }
        
            function generateData(opts, percs) {
                console.log("generateData called");
                var s = [];
                for (var i = 0; i < opts.length; i++) {
                    if (percs[i] === best) {
                        s[i] = {
                            name: opts[i],
                            y: percs[i],
                            sliced: true,
                            selected: true
                        };
                    } else {
                        s[i] = {
                            name: opts[i],
                            y: percs[i],
                            sliced: false,
                            selected: false
                        };
                    }
                }
                return s;
            }
           
        //});  //close POST
        
    },

    settings:function(page){
        console.log('#settingsView');
        this.changePage(new settingsView());

        var shit= document.getElementById("settingsContent");
        var hammertime = new Hammer(shit);
        hammertime.on('swipeleft', function(ev) {
            console.log(ev);
        });
        hammertime.on("swiperight", function(ev){
            window.location.hash="createPoll";
        });

       /* $("#settingsContent").touchwipe({
            wipeLeft: function() {
                console.log("left"); 
            },
            wipeRight: function() { 
                console.log("right");
                window.location.hash ="createPoll";
            },
            min_move_x: 20,
            min_move_y: 20,
            preventDefaultEvents: true  
        }); */
        $("#listFriendsBtn").on("tap",function(e){
                    window.location.hash="listFriends";
        });
        $("#listInstasBtn").on("tap",function(e){
                    window.location.hash="instaPage";
        });

        $("#logOutBtn").on("tap",function(e){
                    window.alert("logged out");
                    window.location.hash="";  //this hash might be incorrect
        });

        $("#searchFN").on("tap",function(e){
                    window.location.hash = "search";
        });
        $("#makeGroupsBtn").on("tap",function(e){
                    window.location.hash = "makeGroupsPage";
        });
    },

    listFriends:function(page){
        console.log('#listFriendsView');
        this.changePage(new listFriendsView());

        var shit= document.getElementById("listFriendsContent");
        var hammertime = new Hammer(shit);
        hammertime.on('swipeleft', function(ev) {
            console.log("left");
        });
        hammertime.on("swiperight", function(ev){
            console.log("right");
            window.location.hash = "settings";
        });
/*        $("#listFriendsContent").touchwipe({
                 wipeLeft: function() {
                    },
                 wipeRight: function() { 
                 // window.alert("right"); 
                    window.location.hash = "settings";
                },
                 min_move_x: 20,
                 min_move_y: 20,
                 preventDefaultEvents: false
        });*/
        var contacts = new Array();
                    $("#listFriendsframe").html('<fieldset id="listFriendsCheckboxes" data-role="controlgroup"><legend>Check box to remove friend</legend></fieldset>');

        $.get("https://web.engr.illinois.edu/~chansky2/getFriends.php", function(data){
//                                $("#listFriendsframe").trigger("create");
            console.log(data);
            var obj = jQuery.parseJSON(data);
            for(var i=0; i<obj.length; i++){
                if(jQuery.inArray(obj[i].username, contacts)==-1)
                    contacts.push(obj[i].username);
            }
            for (var i = 0; i < contacts.length; i++) {
                $("#listFriendsCheckboxes").append('<input type="checkbox" name="' + contacts[i] + '" id="id' + i + '"><label for="id' + i + '">' + contacts[i] + '</label>');
            }
            $("#listFriendsframe").trigger("create");

        });
            //$("#frame").empty();
             //$("#listFriendsframe").trigger("create");
    },
    instaPage:function(page){
        console.log('#listInstasView');
        this.changePage(new listInstasView());

        var shit= document.getElementById("InstaPageContent");
        var hammertime = new Hammer(shit);
        hammertime.on('swipeleft', function(ev) {
            console.log("left");
        });
        hammertime.on("swiperight", function(ev){
            window.location.hash="settings";
        });

      /*  $("#InstaPageContent").touchwipe({
             wipeLeft: function() {
                },
             wipeRight: function() { 
             // window.alert("right"); 
                window.location.hash = "settings";
            },
             min_move_x: 20,
             min_move_y: 20,
             preventDefaultEvents: false
        }); */
        var contacts = new Array();
        $.get("https://web.engr.illinois.edu/~chansky2/getInstas.php", function(data){
            var obj = jQuery.parseJSON(data);
            for(var i=0; i<obj.length; i++){
                contacts.push(obj[i].username);
            }
            $("#frame").html('<fieldset id="instaCheckboxes" data-role="controlgroup"><legend>UnCheck box to cancel notifications</legend></fieldset>');
            for (var i = 0; i < contacts.length; i++) {
                if(obj[i].canSend=='0'){
                   $("fieldset").append('<input type="checkbox" name="' + contacts[i] + '" id="id' + i + '"><label for="id' + i + '">' + contacts[i] + '</label>');
                }
                else{
                    $("fieldset").append('<input type="checkbox" checked="checked" name="' + contacts[i] + '" id="id' + i + '"><label for="id' + i + '">' + contacts[i] + '</label>');
                }
            }
            $("#frame").trigger("create");
        });
    },
    search:function(page){
        console.log('#searchView');
        this.changePage(new searchView());
        var selected = [];
        var shit= document.getElementById("searchContent");
        var hammertime = new Hammer(shit);
        hammertime.on('swipeleft', function(ev) {
            console.log("left");
        });
        hammertime.on("swiperight", function(ev){
            window.location.hash="settings";
        });
       /* $("#searchContent").touchwipe({
             wipeRight: function() { 
             // window.alert("right"); 
                window.location.hash = "settings";
            },
             min_move_x: 20,
             min_move_y: 20,
             preventDefaultEvents: false
        }); */
        $('#keyword').keyup(function () {
            $("#frame").empty()
            var name = $('#keyword').val();
            name = name.toLowerCase();  
            if (name != '') {
                var contacts = [];
                var following = [];
                $.post("https://web.engr.illinois.edu/~chansky2/searchUsers.php",{text:name},function(res){
                    var obj = jQuery.parseJSON(res);
                    for(var i=0; i<obj.length; i++){
                        contacts.push(obj[i].username);
                        following.push(obj[i].isfollowing);
                    }
                    for (var i = 0; i < contacts.length; i++) {
                        var temp = contacts[i];
                        var generic="display:inline-block; margin:10px";
                        temp = temp.toLowerCase();
                        if (temp.indexOf(name) > -1) $('#frame').append('<li><a><h2 style="'+generic+'">'+contacts[i]+'</h2><button style="'+generic+'"class="Add" type="button" id="'+contacts[i]+'">Add</button></a></li>').listview('refresh');
                  } 
                });
                $('#frame').on('click', '.Add', function() {
                    var username = $(this).attr("id");
                    if(jQuery.inArray(username, selected)==-1)
                        selected.push(username);
                    $.post("https://web.engr.illinois.edu/~chansky2/followContacts.php",{type:"follow", usernames:selected},function(res){
                        console.log("followContacts php says: "+res);
                        //window.alert(res);
                       // window.alert("Added: "+username);
                    });
                    $.post("https://web.engr.illinois.edu/~chansky2/addInsta.php",{type:"add", usernames:selected},function(res){
                       window.location.hash = "settings";
                     });
                }); 
            }
        });
    },    
    makeGroupsPage:function (page) {
        console.log('#makeGroupsPage');
        this.changePage(new makeGroupsView());
        var shit= document.getElementById("makeGroupsContent");
        var hammertime = new Hammer(shit);
        hammertime.on('swipeleft', function(ev) {
            console.log("left");
        });
        hammertime.on("swiperight", function(ev){
            window.location.hash="settings";
        });

        var groupContacts = [];
        $("#makeGroupsframe").html('<fieldset id="makeGroupCheckboxes" data-role="controlgroup"><legend>Check box to add friend to group</legend></fieldset>');
        $.get("https://web.engr.illinois.edu/~chansky2/getFriends.php", function(data){
    //                                $("#listFriendsframe").trigger("create");
            console.log(data);
            var obj = jQuery.parseJSON(data);
            for(var i=0; i<obj.length; i++){
                if(jQuery.inArray(obj[i].username, groupContacts)==-1)  //fortunately this is no longer necessary
                    groupContacts.push(obj[i].username);   //since i prevent duplicate insertion into the friendship table
            }
            for (var i = 0; i < groupContacts.length; i++) {
                $("#makeGroupCheckboxes").append('<input type="checkbox" name="' + groupContacts[i] + '" id="id' + i + '"><label for="id' + i + '">' + groupContacts[i] + '</label>');
            }
            $("#makeGroupsframe").trigger("create");

        });
    },
    changePage:function (page) {
        //$('div[data-role="page"]').remove();  //this is doing something but maybe its removing too much? not sure if detach or remove is best...
        //console.log("just got into changePage fn: "+$('div[data-role="page"]').html());
        $(page.el).attr('data-role', 'page');
        page.render();
        var oldPage=$('div[data-role="page"]');
        $('body').append($(page.el));
        oldPage.remove();
        //console.log("page: "+page+"       page EL: "+page.el);
        $.mobile.changePage($(page.el), {changeHash:false});
      // $.mobile.changePage(window.location.hash);
        //console.log("end of changePage fn: "+window.location.hash);
    }

});

$(document).ready(function () {
    if(localStorage.getItem("lastPage")!=null){
       // window.alert("hi me");
        console.log("i stored the last page: "+localStorage.getItem("lastPage"));
        onResume();
    }
    FastClick.attach(document.body);
    console.log('document ready');
    app = new AppRouter();
    Backbone.history.start();


document.addEventListener("deviceready",onDeviceReady,false);

});

    function onDeviceReady() {
        console.log("device is ready");
        StatusBar.hide();
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        document.addEventListener("pause", onPause, false);
        document.addEventListener("resume", onResume, false);
        feedVisited=0; //a variable to control reloading the feed data.
         windowWidth = window.innerWidth;
         windowHeight = window.innerHeight;
         console.log("screen width is: "+windowWidth+", height is: "+windowHeight);
         deviceID=-1;
         theToken=-1;
         PUSHAPPS_APP_TOKEN="5ebcbd9a-8583-446e-81ee-f19e339fa88e";
         YOUR_GOOGLE_PROJECT_ID="75213574961";
       // console.log("destination type is: "+destinationType);
    }







    function onPhotoDataSuccess(imageData) {
      var smallImage = document.getElementById('tmppic');
      smallImage.style.display = 'block';
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }
    function onPhotoURISuccess(imageURI) {
        var smallImage;
        //window.alert("WickedIndex: "+WickedIndex);
        var currID="tmppic"+WickedIndex;
        console.log("curr id is: "+currID);
        var oIndex=-1;
        for(var i=0; i<options.length; i++){
            if (options[i].counterNum==WickedIndex)
                oIndex=i;
        }
        console.log("oIndex is: "+ oIndex+", and WickedIndex is: "+WickedIndex);
        options[oIndex].containsImg=1;
        smallImage= document.getElementById(currID);
        console.log("the image that was clicked on: "+smallImage);
        smallImageSource= smallImage.src;
        console.log("and its source is: "+smallImageSource);
        if(smallImageSource.indexOf("default_pic.png")>-1){
                smallImage.style.display = 'block';
                smallImage.src = imageURI;
                uniquePhotoCount++;
                photos.push(smallImage.src); //adds photo to photo array
                console.log("added one photo");
                console.log("photos length immdediately following add: "+photos.length);
        }
        else{  //we're replacing an image that was already taken so need to update the photos array
            var index=photos.indexOf(smallImage.src);
                smallImage.style.display = 'block';
                smallImage.src = imageURI;
            photos[index]=smallImage.src;
            console.log("replaced a photo");
        }
    }
    function capturePhoto() {
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI});  //recently added correctOrientation: true , except it breaks android upload...
    }
    function capturePhotoEdit() {
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI});
    }
    function getPhoto(source) {
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source});
    }
    function onFail(message) {
      alert('Failed because: ' + message);
    }

    function exitMenu(){
        console.log("exiting photo menu");
    }

    function add_option_textFN(){
//
    }
    function goToSendToPage(){
           //window.alert("tapped sendTo");
            var isInsta= $("#INSTABOX").is(":checked");
            if(!isInsta){
              isInsta="0";
            }
            var question = $("#question").val();
            var ddl = document.getElementById("timeOptions");
            var selectedValue = ddl.options[ddl.selectedIndex].value;
            var d = new Date();
            var seconds = d.getUTCSeconds();
            var minutes = d.getUTCMinutes();
            var hour = d.getUTCHours();
            var year = d.getUTCFullYear();
            var month = d.getUTCMonth()+1; // beware: January = 0; February = 1, etc.  //need +1 b/c of php
            var day = d.getUTCDate();
            //second set of these values for dissapear time
            var s, m, h, y, mo, d;
            y=year;
            mo=month;
            s=seconds;
            h=hour;
            m=minutes;
            d=day;
            var noTimePicked=0;
            if(selectedValue=="1 Minute"){
                minutes=minutes+1;
                m=minutes+1;
            }
            else if(selectedValue=="5 Minutes"){
                minutes=minutes+5;
                m=minutes+5;
            }
            else if(selectedValue=="10 Minutes"){
                minutes=minutes+10;
                m=minutes+10;
            }
            else if (selectedValue=="30 Minutes"){
                minutes=minutes+30;
                m=minutes+30;
            }
            else if (selectedValue=="1 Hour"){
                hour=hour+1;
                h=hour+1;
            }
            else if (selectedValue=="1 Day"){
                day=day+1;
                d=day+1;
            }
            else if (selectedValue=="1 Week"){
                day=day+7;
                d=day+7
            }
            else{
                noTimePicked=1;
            }
            //seems like the below should only happen if no time picked is still equal to 0...
            if(minutes>=60){
              minutes=minutes%60;
              hour=hour+1;
            }
            if(m>=60){
              m=m%60;
              h=h+1;
            }
            if(hour>=24){
              hour=hour%24;
              day=day+1;
            }
            if(h>=24){
              h=h%24;
              d=d+1;
            }
            if(day>daysInMonth(month,year)){
              day=day-daysInMonth(month,year);
              month=month+1;
            }
            if(d>daysInMonth(mo, y)){
              d=d-daysInMonth(mo, y);
              mo=mo+1;
            }
            if(month>11){
              month=0;
              year=year+1;
            }
            if(mo>11){
              mo=0;
              y=y+1;
            }
            if(month<10){  //need this to make php and sql happy
                month="0"+month;
            }
            if(m<10){
              m="0"+m;
            }
           var et="";
           var dt="";
           if(noTimePicked!=1){
                var et=year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds;
                var dt=y+"-"+mo+"-"+d+" "+h+":"+m+":"+s;
            }
            var allPollInfo={'endTime': et, 'optionsArr':options, 'isInsta': isInsta, 'question': question, 'photoArr': photos, 'disappearTime':dt};
            if(typeof(window.localStorage) != 'undefined'){ 
                window.localStorage.setItem('allPollInfo', JSON.stringify(allPollInfo));
            } 
            else{ 
                window.alert("storage failed...");
                console.log("store FAILED");
                throw "window.localStorage, not defined"; 
            }
            optionCounter=0;
            //options=[];  //testing empty  
            //photos=[];  //testing empty
            window.location.hash="sendToPage";
    }

    function send(){
        var selected = [];
        var groupsSelected=[];
        $('#sendToCheckboxes input:checked').each(function() {
            selected.push($(this).attr('name'));
        });
        $('#groupNameCheckBoxes input:checked').each(function(){
            groupsSelected.push($(this).attr('name'));
        });
            console.log("1st group selected: "+groupsSelected[0]);
    //get info from local storage
        var info=(localStorage.getItem("allPollInfo"));
        var parsedInfo=JSON.parse(info);
        var et = parsedInfo["endTime"];
        var dt= parsedInfo["disappearTime"];
        var isInsta=parsedInfo["isInsta"];
        var options=parsedInfo["optionsArr"];
        var question=parsedInfo["question"];
        var photos=parsedInfo["photoArr"];
        window.alert("your poll is being created!");
        $.post("https://web.engr.illinois.edu/~chansky2/addPollI.php",{question:question, num_options:options.length,
            options:options, insta:isInsta, endtime:et, disappearTime:dt, receivers:selected, receivingGroups:groupsSelected},function(res){
            //window.alert("res: "+res);
            console.log("the output of the call to addPollI: "+res);
            var retVal=parseInt(res);
            console.log("ret val is: "+retVal);
            uploadStuff(retVal, photos);
            localStorage.removeItem("allPollInfo");
            window.location.hash="createPoll";
        });
      }

    function uploadStuff(num, photos){
        console.log("in upload stuff (the function that uploads the photos)");
        console.log("photo length is: "+photos.length);
        var fileName="";
        var image=0;
        if(photos.length>0)
            image=1;
        if(image==1){
            for(var i=0; i<photos.length; i++){  
                fileName=photos[i];
                var uploadOptions = new FileUploadOptions();
                uploadOptions.fileKey="file";
                uploadOptions.fileName=num+".jpg";  //look at num
                console.log("pic file name: "+uploadOptions.fileName);
                uploadOptions.mimeType="image/jpg";
                uploadOptions.chunkedMode=false;
                //uploadOptions.correctOrientation= true;  //this didn't do anything
             //   uploadOptions.chunkedMode = true;  //new
                uploadOptions.headers = {Connection: "close"}; //new, this really helped android upload!
                var params = new Object();
                uploadOptions.params = params;
                var ft = new FileTransfer();
                ft.upload(fileName, encodeURI("https://web.engr.illinois.edu/~chansky2/uploadFile.php"), win, fail, uploadOptions, true);
                num++;
            }
        }
                    options=[]; photos=[];  //testing emptying  
    }

  function win(r) {
    console.log("image upload worked");
 //  window.alert("SUCCESS");
    console.log("Code = " + r.responseCode);
    console.log("r is: "+r);
   console.log("Response = " + r.response);
   console.log("Sent = " + r.bytesSent/1024);
                     //   window.alert("Poll Created!");
}

function fail(error) {
    window.alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
     window.location.hash="createPoll";
}

    function closePoll(){
       Over=1;
        var val = document.getElementsByName("radio-choice");
        for(var i=0; i<val.length; i++){
            val[i].disabled=true;
        }
    } 

function removeFn(){
  //window.alert("in remove");
  var selected = [];
  $('#listFriendsCheckboxes input:checked').each(function() {
      selected.push($(this).attr('name'));
  });
  $.post("https://web.engr.illinois.edu/~chansky2/followContacts.php",{type:"unfollow", usernames:selected},function(res){
    //location.reload();
   // window.alert(res);
    window.alert("unfollowing");
  });
  $.post("https://web.engr.illinois.edu/~chansky2/addInsta.php",{type:"remove", usernames:selected},function(res){
    //window.alert(res);
   window.location.hash = "settings";
 });
}

function addToGroup(){
    var selected = [];
    $('#makeGroupCheckboxes input:checked').each(function() {
      selected.push($(this).attr('name'));
    });
        var gN = $("#groupTitle").val();
        console.log("group name is: "+gN);
    $.post("https://web.engr.illinois.edu/~chansky2/buildGroup.php",{groupees:selected, groupName:gN},function(res){
            //window.alert("res: "+res);
            console.log("the output of the call to buildGroup: "+res);
            window.location.hash = "settings";
        });
}

function update(){
  var selected = [];
  var notSelected = [];

  $('#instaCheckboxes input:checked').each(function() {
      selected.push($(this).attr('name'));
  });
  $.post("https://web.engr.illinois.edu/~chansky2/addInsta.php",{type:"reFollow", usernames:selected},function(res){
    //location.reload();
    //window.alert("called add insta with reFollow");
    //window.alert(res);
  });
  $('#instaCheckboxes input:checkbox:not(:checked)').each(function() {
      notSelected.push($(this).attr('name'));
    //  window.alert("not selected: "+notSelected[0]);
  });
  $.post("https://web.engr.illinois.edu/~chansky2/addInsta.php",{type:"unfollow", usernames:notSelected},function(res){
    //location.reload();
    //window.alert("called addInsta with unfollow");
    //window.alert(res);
  });
  window.alert("changes made");
  window.location.hash="settings";
}



    function onPause() {
        console.log("curr hash: "+window.location.hash);
        window.localStorage.setItem("lastPage", window.location.hash);  
    }
    function onResume() {
        console.log("resuming!");
        feedVisited=0;
        window.location.hash=localStorage.getItem("lastPage");
    }













  function parsenum(pnum){
                pnum = pnum.toString();
                var num = "";
                var count = 0;
                var i = pnum.length-1;

                while(count != 10){
                    if(pnum.charAt(i) !== '-'){
                        num = pnum.charAt(i)+ num;
                        count++;
                    }
                    i--;
                }
                return num;
            }   

            function onError(contactError) {
                alert('onError!');
            }

            function follow(){
                var selected = [];
                $('#contactsCheckboxes input:checked').each(function() {
                    selected.push($(this).attr('name'));
                });
                //window.alert(selected);
                $.post("https://web.engr.illinois.edu/~chansky2/followContacts.php",{type:"follow", usernames:selected},function(res){
                    //window.alert(res);
                    //window.location = "createPoll.html";
                });
                //and also sign up to receive thier notifications (by default)
                $.post("https://web.engr.illinois.edu/~chansky2/addInsta.php",{type:"add", usernames:selected},function(res){
                    //window.alert(res);
                    window.location.hash = "createPoll";
                });
            }
            function skip(){
                window.location.hash = "createPoll";

            }    






function registerHelper(g, ph, em, u, p, a){
    console.log("in register helper");
    console.log("theToken is: "+theToken);
    if((theToken==-1)||(deviceID==-1)){
        console.log("something still equals negative one");
            PushNotification.registerDevice(YOUR_GOOGLE_PROJECT_ID, PUSHAPPS_APP_TOKEN, function (pushToken) {
                                                //window.alert("My push token: " + pushToken);
                                                if(theToken==-1)
                                                    theToken=pushToken;
                                                //e.preventDefault();
                                               // theRegisterPost(theToken, deviceID, g, ph, em, u, p, a);
                                            },
                                            function (error) {
                                                window.alert("error call back about to follow");
                                                window.alert(error);
                                            });

        PushNotification.getDeviceId(function (deviceId) {
                                               // window.alert("Your device ID: " + deviceId);
                                                if(deviceID==-1)
                                                    deviceID=deviceId;
                                                //e.preventDefault();
                                            },
                                            function (error) {
                                                window.alert(error);
                                            });

    //}
    //else{
        console.log("one of the values was not set");
        setTimeout(function(){
            registerHelper(g, ph, em, u, p, a);
        }, 3000);
    }
    else{
        theRegisterPost(theToken, deviceID, g, ph, em, u, p, a);
        //its now safe to call theRegisterPost
    }
}









        function theRegisterPost(theToken, deviceID, g, ph, em, u, p, a){
            console.log("the values are: theToken-"+theToken+"\n deviceID-"+deviceID+"\n username-"+u);
            if(theToken!=-1&&deviceID!=-1){
               // window.alert("about to do the deviceType stuff");
                var devicePlatform = device.platform;
             //   window.alert("device is: "+devicePlatform);
                var deviceType=-1;
                    if(devicePlatform=="Android"){
                        deviceType=1;
                    }
                    else{
                        deviceType=2;
                    }
                  //  window.alert("device type: "+deviceType);
                  
               // window.alert("username being sent is: "+ u);
                if(em!='' && u!='' && p!=''&& deviceID!=''){
                    //TODO: field validation
                    //window.alert("posting");
                 //   window.alert("the token being sent is: "+theToken);
                   // window.alert("the device id being sent is: "+deviceID);
                    $.post("https://web.engr.illinois.edu/~chansky2/register.php",{gender:g,phonenumber:ph,email:em,username:u,password:p,age:a,token:theToken,deviceID:deviceID,deviceType:deviceType},function(res){
                   // window.alert(res);
                        console.log("res at 0: "+res[0]+" ,res at 1: "+res[1]+ ", res at 2: "+res[2]);
                        if(res[2]=='t'){
                            console.log("inside the res==t");
                                                    window.location.hash ="contactsPage";

                        }
                        console.log("return vals from register call: "+res);

                    }); 
                    for(var i=0; i<20000; i++){
                        //do nothing
                        if(i==19999)
                            console.log("finished third round of doing nothing");
                    }
                    //window.alert(res);
                    //window.alert("outside of post");
                    console.log("outside of post");

                }
                else{
                    window.alert("empty field(s)");
                    //location.reload();
                    //navigator.notification.alert("field empty",function(){});
                }
            }
         /*   else{
                console.log("checking again");
                setTimeout(function(){
                    theRegisterPost(theToken, deviceID, g, ph, em, u, p, a);
                },4000);
            }*/
        //return;
        }






