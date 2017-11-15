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

window.addEventListener("click",(function (){
  console.log($("input[id$='-sd']").val());
  chrome.runtime.sendMessage({method: "startDate",param:$("input[id$='-sd']").val()});
  console.log($("input[id$='-st']").val());
  chrome.runtime.sendMessage({method: "startTime",param:$("input[id$='-st']").val()});
  console.log($("input[id$='-et']").val());
  chrome.runtime.sendMessage({method: "endTime",param:$("input[id$='-et']").val()});
  console.log($("input[id$='-ed']").val());
  chrome.runtime.sendMessage({method: "endDate",param:$("input[id$='-ed']").val()});
}),true);

var url = chrome.extension.getURL('login.html');
var button = "<button id='myButton12345'>Toggle</button>"
var iframe = "<iframe id='myOwnCustomToolbar12345' src="+url+"></iframe>"

function hashCheck(){
    if(window.location.hash === "#eventpage_6"){
        $("#maincell").append(button);
        $("#maincell").append(iframe);
        document.getElementById('myButton12345').addEventListener('click', toggle);
    }
    else{
        $("#maincell").hide($("#myButton12345"));
        $("#maincell").hide($("#myOwnCustomToolbar12345"));
    }
}

$(".goog-inline-block").click(function(){
    document.onload = function(){
      $("#maincell").append(button);
      $("#maincell").append(iframe);
      document.getElementById('myButton12345').addEventListener('click', toggle);
    }
});

window.onload = hashCheck();
hashCheck();
