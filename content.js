chrome.runtime.onMessage.addListener(function(msg, sender){
     console.log(msg);
    if(msg == "toggle"){
        toggle();
    }
    else if(msg.method == "selectRoom"){
        console.log($("input[id^='\:2'].textinput").val());
        $("input[id^='\:2'].textinput").val(msg.param);
    }
});

function toggle(){
    if(document.getElementById("myOwnCustomToolbar12345").style.width == "0px"){
        // console.log(document.getElementById("myOwnCustomToolbar12345").style.width);
        document.getElementById("myOwnCustomToolbar12345").style.width="520px";
        document.getElementById("myOwnCustomToolbar12345").style.borderWidth="1px";
    }
    else{
        // console.log(document.getElementById("myOwnCustomToolbar12345").style.width);
        document.getElementById("myOwnCustomToolbar12345").style.width="0px";
        document.getElementById("myOwnCustomToolbar12345").style.borderWidth="0px";
    }
}

var startDate = "";
var startYear = "";
var startMonth = "";
var startDay = "";
var startTime = "";
var startHour = "";
var startMin = "";
var endDate = "";
var endYear = "";
var endMonth = "";
var endDay = "";
var endTime = "";
var endHour = "";
var endMin = "";

setInterval(function sendValueMessages(){
    // console.log($("input[id$='-sd']").val());
  if($("input[id$='-sd']").val() !== undefined){
    //init startTime
    startDate = $("input[id$='-sd']").val().split('/');
    startYear = startDate[2];
    startMonth = startDate[0];
    startDay = startDate[1];
    startTime = $("input[id$='-st']").val().split(':');
    startHour = parseInt(startTime[0]);
    if(startTime[1].substring(2) == "pm" && startHour != 0 && startHour != 12) startHour += 12;
    if(startTime[1].substring(2) == "am" && startHour == 12) startHour -= 12;
    if(startMonth < 10) startMonth = "0" + startMonth;
    if(startDay < 10) startDay = "0" + startDay;
    if(startHour < 10) startHour = "0" + startHour;
    startMin = startTime[1].substring(0,2) + "00";
    //init endTime
    endDate = $("input[id$='-ed']").val().split('/');
    endYear = endDate[2];
    endMonth = endDate[0];
    endDay = endDate[1];
    endTime = $("input[id$='-et']").val().split(':');
    endHour = parseInt(endTime[0]);
    if(endTime[1].substring(2) == "pm" && endHour != 0 && endHour != 12) endHour += 12;
    if(endTime[1].substring(2) == "am" && endHour == 12) endHour -= 12;
    if(endMonth < 10) endMonth = "0" + endMonth;
    if(endDay < 10) endDay = "0" + endDay;
    if(endHour < 10) endHour = "0" + endHour;
    endMin = endTime[1].substring(0,2) + "00";
    //send Message
    chrome.runtime.sendMessage({method: "startTime",param: startYear+startMonth+startDay+startHour+startMin});
    chrome.runtime.sendMessage({method: "endTime",param: endYear+endMonth+endDay+endHour+endMin});
    chrome.runtime.sendMessage({method: "interfaceStartTime",param: $("input[id$='-st']").val()});
    chrome.runtime.sendMessage({method: "interfaceEndTime",param: $("input[id$='-et']").val()});
  }
},500);


var url = chrome.extension.getURL('index.html');
var imgurl = chrome.extension.getURL('/assets/images/toggle_open.png');
var button = "<button id='myButton12345'><img src="+imgurl+" /></button>"
var iframe = "<iframe id='myOwnCustomToolbar12345' src="+url+"></iframe>"

$("#maincell").append(button);
$("#maincell").append(iframe);

document.getElementById('myButton12345').addEventListener('click', toggle);

function hashCheck(){
    if(window.location.hash === "#eventpage_6" && $("input[id$='-sd']").val() !== undefined){
        $("#myButton12345").show();
        $("#myOwnCustomToolbar12345").show();
    }
    else{
        $("#myButton12345").hide();
        $("#myOwnCustomToolbar12345").hide();
    }
}

$("#maincell").on("DOMSubtreeModified", function(){
    if($("input[id$='-sd']").val() !== undefined){
        $("#myButton12345").show();
        $("#myOwnCustomToolbar12345").show();
    }
    else{
        $("#myButton12345").hide();
        $("#myOwnCustomToolbar12345").hide();
    }
});

window.addEventListener("hashchange",function(){
    hashCheck();
});
hashCheck();
