var iframe = document.getElementById("myOwnCustomToolbar12345");

chrome.runtime.onMessage.addListener(function(msg, sender){
    // console.log(msg);
    if(msg.param === undefined || document.getElementById("startDate") === null){
        //debugging
    }
    else if(msg.method == "startDate"){
        document.getElementById("startDate").innerHTML = msg.param;
    }
    else if(msg.method == "startTime"){
        document.getElementById("startTime").innerHTML = msg.param;
    }
    else if(msg.method == "endTime"){
        document.getElementById("endTime").innerHTML = msg.param;
    }
    else if(msg.method == "endDate"){
        document.getElementById("endDate").innerHTML = msg.param;
    }
});
