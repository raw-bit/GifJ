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

var views = document.querySelectorAll(".api-view")

views.forEach(function (elem) {
    elem.addEventListener("click", function () {
        document.getElementsByClassName("api-preview")[0].style.backgroundImage = "url('" + this.getAttribute("data") + "')"
    });
})

views.forEach(function (elem) {
    elem.addEventListener("mouseover", function () {
        var swap = this.getAttribute("data")
        swap = swap.replace("url(", "").replace(")", "").replace(/\"/gi, "")
        this.setAttribute("data", this.style.backgroundImage)
        this.style.backgroundImage = "url('" + swap + "')"
    })
    elem.addEventListener("mouseout", function () {
        var swap = this.getAttribute("data")
        swap = swap.replace("url(", "").replace(")", "").replace(/\"/gi, "")
        this.setAttribute("data", this.style.backgroundImage)
        this.style.backgroundImage = "url('" + swap + "')"
    })
})

views.forEach(function (elem) {
    elem.addEventListener("click", function () {
        document.getElementsByClassName("api-preview")[0].style.backgroundImage = this.style.backgroundImage.replace(")", "").replace(/\"/gi, "")
    })
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
    if (gifList) {
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