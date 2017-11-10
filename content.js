chrome.runtime.onMessage.addListener(function(msg, sender){
    console.log(msg);
    if(msg == "toggle"){
        toggle();
    }
});

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function toggle(){
    if(document.getElementById("myOwnCustomToolbar12345").style.width == "0px"){
        document.getElementById("myOwnCustomToolbar12345").style.width="550px";
        document.getElementById("myOwnCustomToolbar12345").style.borderWidth="1px";
    }
    else{
        document.getElementById("myOwnCustomToolbar12345").style.width="0px";
        document.getElementById("myOwnCustomToolbar12345").style.borderWidth="0px";
    }
}

var url = chrome.extension.getURL('toolbar.html');
var width = "550px";
var button = "<button id='myButton12345'>Toggle</button>"
var iframe = "<iframe id='myOwnCustomToolbar12345' style:width="+width+" src="+url+"></iframe>"

$("#maincell").append(button);
$("#maincell").append(iframe);

document.getElementById('myButton12345').addEventListener('click', toggle);

$(document).ready(function () {
  console.log("ready");
$("#maincell").bind("DOMSubtreeModified",function(e){
  if (e.target.innerHTML.length > 0) {
    console.log($("input[id$='-sd']").val());
    chrome.runtime.sendMessage({method: "startDate",param:$("input[id$='-sd']").val()});
    console.log($("input[id$='-st']").val());
    chrome.runtime.sendMessage({method: "startTime",param:$("input[id$='-st']").val()});
    console.log($("input[id$='-et']").val());
    chrome.runtime.sendMessage({method: "endTime",param:$("input[id$='-et']").val()});
    console.log($("input[id$='-ed']").val());
    chrome.runtime.sendMessage({method: "endDate",param:$("input[id$='-ed']").val()});
    }
  });
});
