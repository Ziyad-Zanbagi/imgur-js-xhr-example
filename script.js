const clientId = "36cabdb4bbe3c71";
// 286e0785ddb0b82c020dc7ee4e087d6598fbd3ea

var defaultAlbumId = '';

function requestAlbumXHR() {
    let albumId = document.getElementById("albumIdField").value;
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            //processAlbumRequest(req.responseText);
            let response = JSON.parse(req.responseText)
            for(item of response.data){
                let imgElem = document.createElement("img");
                imgElem.src = item.link;

                resultDiv.appendChild(imgElem);
            }
        }
        else if (req.readyState == 4 && req.status != 200) {
            console.log(req.status + " Error with the imgur API: ", req.responseText);
        }
    }
    req.open('GET', 'https://api.imgur.com/3/album/' + albumId + '/images', true); // true for asynchronous   
    // Authorization: Client-ID YOUR_CLIENT_ID  
    req.setRequestHeader('Authorization', 'Client-ID ' + clientId);
    req.send();
}
function requestAlbumFetch(){
    let albumId = document.getElementById("albumIdField").value;
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    var requestOptions = {
        method: 'GET'
      };
    fetch("https://api.imgur.com/3/album/" + albumId + "/images", requestOptions)
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        let response = JSON.parse(data)
        for(item of response.data){
            let imgElem = document.createElement("img");
            imgElem.src = item.link;
            resultDiv.appendChild(imgElem);
        }
    })
    .catch((e) => {
        console.error(e);
    })
}
async function requestAlbumAsyncAwait() {
    let albumId = document.getElementById("albumIdField").value;
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    var requestOptions = {
        method: 'GET'
      };
    const response = await fetch("https://api.imgur.com/3/album/" + albumId + "/images", requestOptions); // Wait until the request completes.
    const data = await response.json(); // waits until the response completes
    console.log(data)
    for(item of data.data){
        let imgElem = document.createElement("img");
        imgElem.src = item.link;
        resultDiv.appendChild(imgElem);
    }
}

