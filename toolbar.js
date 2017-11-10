var iframe = document.getElementById("myOwnCustomToolbar12345");

function toggle(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,"toggle");
    })
}

chrome.runtime.onMessage.addListener(function(msg, sender){
    console.log(msg);
    if(msg.method == "startDate"){
        document.getElementById("startDate").innerHTML = msg.param;
    }
    if(msg.method == "startTime"){
        document.getElementById("startTime").innerHTML = msg.param;
    }
    if(msg.method == "endTime"){
        document.getElementById("endTime").innerHTML = msg.param;
    }
    if(msg.method == "endDate"){
        document.getElementById("endDate").innerHTML = msg.param;
    }
});


document.getElementById('toggle_button').addEventListener('click', toggle);
