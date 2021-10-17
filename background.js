
console.log("background runs");
chrome.runtime.onMessage.addListener(receiver);

window.word = "";
function receiver(msg, sender, sendResponce){
    console.log(msg);
    // alert(msg)
} 


