const ipcPlusR = require("electron-ipc-plus");

        document.getElementById("searchBtn").addEventListener("click", function () {
            var searchString = document.getElementById("searchBox").value;
            ipcPlusR.sendToMain("search", searchString, (err, message) => {
                var views = document.getElementsByClassName("api-view")
                var length = message.length
                for (i=0; i < 18; i++) {
                    console.log(views[i] + " " + message[i])
                    views[i].style.backgroundImage = "url('" + message[i] + "')"
                }
            })
        })