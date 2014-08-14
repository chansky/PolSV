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
      
    
       /* $("#chartContent").touchwipe({
            wipeLeft: function() {
            console.log("left"); 
            },
            wipeRight: function() { 
                console.log("right"); 
                window.location.hash = "personalFeed";
            },
            min_move_x: 20,
            min_move_y: 20,
            preventDefaultEvents: true
        }); */
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
            var totalVotes = 0;
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
            function generateData(opts, percs) {
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
        });  //close POST