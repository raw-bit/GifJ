const ipcPlusR = require("electron-ipc-plus");

var offset = 0
var gifList = null
var views = document.getElementsByClassName("api-view")
var viewNum = views.length

document.getElementById("searchBtn").addEventListener("click", function () {
    var searchString = document.getElementById("searchBox").value;
    ipcPlusR.sendToMain("search", searchString, (err, message) => {
        gifList = message
        displayView()
    })
})

document.querySelectorAll(".api-view").forEach(function (elem) {
    elem.addEventListener("click", function () {
        document.getElementsByClassName("api-preview")[0].style.backgroundImage = "url('" + this.getAttribute("data") + "')"
    });
})

document.getElementById("viewNext").addEventListener("click", function () {
    if (gifList) {
    if (offset >= gifList.length) {
        offset = 0
    }
    displayView()
    }
})

document.getElementById("viewPrev").addEventListener("click", function () {
    if(gifList) {
    if (offset <= 0) {
        offset = gifList.length - viewNum
    } else {
        offset = offset - (viewNum * 2)
    }
       displayView() 
    }
})

function displayView() {
        for (i = 0; i < viewNum; i++) {
        views[i].style.backgroundImage = "url('" + gifList[offset][0] + "')"
        views[i].setAttribute("data", gifList[offset][1])
        offset++
    }
}