        function displayFeed(){
            console.log("displayFeed called");
            for (var j = 0; j < dataLength; j++) {   //not sure why this needs to be in the get
                var generic="display:inline-block; height:18%; margin:10px";
                var clock="display:inline-block; width:18%; height:18%; margin:5px";
                var phrase='<li><a><div class="'+j+'", data-timer="'+endtime[j]+'", style="'+clock+'"></div><h2 style="'+generic+'">'+usernames[j]+'</h2><p style="'+generic+'">'+endtime[j]+' seconds remaining...</p></a></li>';
                $('#feedList').append(phrase).listview('refresh');
                //add the time circle for each row:
                console.log("endtime for item "+j+", is: "+endtime[j]);
                var input="."+j;
                $(input).TimeCircles({ use_background: false, fg_width: .395 , bg_width: 1.0, count_past_zero: false, time: {
                    Days: { show: false},
                    Hours: { show: false},
                    Minutes: { show:false},
                    Seconds: { color: "#F99", text:""}
                }});
                $(input).TimeCircles({total_duration: "Minutes"}).rebuild();
                $('#feedList').listview('refresh');
            }
        }