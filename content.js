
window.addEventListener("mouseup", wordSelected)

let selected_text = "";

function wordSelected(){
    selected_text = window.getSelection().toString().trim().toLowerCase();
    // console.log(selected_text);
    if(selected_text.length > 0){
        let msg = {
            text : selected_text
        }
        chrome.runtime.sendMessage(msg);
    }
}

let getTranslation = (selected_text)=>{
    const data = JSON.stringify([
        {
            "Text": selected_text
        }
    ]);
    
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(JSON.parse(this.responseText)[0].translations[0].text);
            replaceSelectionWithHtml(JSON.parse(this.responseText)[0].translations[0].text + " ")
        }else{
            return false;
        }
    });
    
    xhr.open("POST", "https://microsoft-translator-text.p.rapidapi.com/translate?to=hi&api-version=3.0&profanityAction=NoAction&textType=plain");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-rapidapi-host", "microsoft-translator-text.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "301a57829cmshd5b01de0f53ab7dp143bbcjsnae75388b90da");
    
    xhr.send(data);
}

 
chrome.runtime.onMessage.addListener(messageGot);

function messageGot(request, sender, sendResponse)  {
    if(request.msg === "translate"){
        
        //calling function for defination
        getTranslation(selected_text);
        

    }
}

// repace function

function replaceSelectionWithHtml(html) {
    var range;
    html = `<div style="background-color: #FBE7C6; display:inline-block">${html}</div>`
    if (window.getSelection && window.getSelection().getRangeAt) {
        range = window.getSelection().getRangeAt(0);
        range.deleteContents();
        var div = document.createElement("div");
        div.innerHTML = html;
        var frag = document.createDocumentFragment(), child;
        while ( (child = div.firstChild) ) {
            frag.appendChild(child);
        }
        range.insertNode(frag);
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.pasteHTML(html);
    }
}

