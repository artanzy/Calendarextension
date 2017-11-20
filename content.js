chrome.runtime.onMessage.addListener(function(msg, sender){
    console.log(msg);
    if(msg == "toggle"){
        toggle();
    }
});

function toggle(){
    if(document.getElementById("myOwnCustomToolbar12345").style.width == "0px"){
        console.log(document.getElementById("myOwnCustomToolbar12345").style.width);
        document.getElementById("myOwnCustomToolbar12345").style.width="550px";
        document.getElementById("myOwnCustomToolbar12345").style.borderWidth="1px";
    }
    else{
        console.log(document.getElementById("myOwnCustomToolbar12345").style.width);
        document.getElementById("myOwnCustomToolbar12345").style.width="0px";
        document.getElementById("myOwnCustomToolbar12345").style.borderWidth="0px";
    }
}

setInterval(function sendValueMessages(){
    // console.log($("input[id$='-sd']").val());
    chrome.runtime.sendMessage({method: "startDate",param:$("input[id$='-sd']").val()});
    // console.log($("input[id$='-st']").val());
    chrome.runtime.sendMessage({method: "startTime",param:$("input[id$='-st']").val()});
    // console.log($("input[id$='-et']").val());
    chrome.runtime.sendMessage({method: "endTime",param:$("input[id$='-et']").val()});
    // console.log($("input[id$='-ed']").val());
    chrome.runtime.sendMessage({method: "endDate",param:$("input[id$='-ed']").val()});
},500);


var url = chrome.extension.getURL('index.html');
var button = "<button id='myButton12345'>Toggle</button>"
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
