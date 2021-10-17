let contextMenu = {
    "id": "Translator",
    "title":"Traslate selection",
    "contexts":["selection"]
};

chrome.contextMenus.create(contextMenu);

chrome.contextMenus.onClicked.addListener(function(){
    
    let param = {
        active:true,
        currentWindow: true
    }
       
        chrome.tabs.query(param, function(tabs){
            let msg = {
                "msg": "translate"
            }
          chrome.tabs.sendMessage(tabs[0].id, msg)  
        })
   
})