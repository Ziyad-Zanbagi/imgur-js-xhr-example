const clientId = "ae46f54c86c85c3";

var defaultAlbumId = 'Jfni3';

function requestAlbum() {
    let albumId = document.getElementById("albumIdField").innerText;
    console.log(albumId)
    if(!albumId) {
        albumId = defaultAlbumId;
    }
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            //processAlbumRequest(req.responseText);
            let response = JSON.parse(req.responseText)
            for(item of response.data){
                let imgElem = document.createElement("img");
                imgElem.src = item.link;
                document.body.appendChild(imgElem);
            }
        }
        else if (req.readyState == 4 && req.status != 200) {
            console.log(req.status + " Error with the imgur API: ", req.responseText);
        }
    }
    req.open('GET', 'https://api.imgur.com/3/album/' + albumId + '/images', true); // true for asynchronous     
    req.setRequestHeader('Authorization', 'Client-ID ' + clientId);
    req.send();
}
