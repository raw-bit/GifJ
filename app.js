'use strict';

const env = require('node-env-file')
const electron = require('electron')
const app = electron.app

const windowManager = require('electron-window-manager')
env(__dirname + '/.env')

const request = require('request')
const ipcPlusM = require('electron-ipc-plus')

app.on('ready', function () {

    windowManager.init({
        'appBase': 'main',
        'layouts': {
            'default': 'main/layouts/control.html',
            'display': 'main/layouts/display.html'
        },
        'defaultLayout': 'default',
        'defaultWindowTitle': 'GifJ',
        'onLoadFailure': function (window) {
            window.loadURL('/error.html')
        }
    })
    var main = windowManager.open('main', 'GifJ', '/index.html', false, {
        'width': 1000,
        'height': 750,
        'position': 'topLeft',
        'resizable': true,
        showDevTools: true,
        show: false
    })

    var display = windowManager.open('display', 'Display', false, false, {
        'width': 500,
        'height': 500,
        'position': 'bottomRight',
        'layout': 'display',
        'resizable': true,
        'menu': null,
        showDevTools: false,
        show: false
    })

    main.onReady(true, function (window) {
        windowManager.bridge.emit('test', 'test message', display, main)

    })

    /*main.on("ready-to-show", () => {
        main.show
        display.show
    })*/
    
    windowManager.bridge.on('test', function (event) {
        display.html('<h3>' + event + '</h3>')
    })
    

    ipcPlusM.on('search', function (event, message) {
        if (!message == "") {
            let reqUrl = 'http://api.giphy.com/v1/gifs/search?q=' + message + '&api_key=' + process.env.GIFYAPI + '&limit=50'
            request(reqUrl, function (error, response, body) {
                //console.log('error:', error)
                //console.log('statusCode:', response && response.statusCode)
                let result = []
                let obj = JSON.parse(body)
                let limit = obj.data.length
                for (let i = 0; i < limit; i++) {
                    result.push(obj.data[i].images.original.url)
                }
                event.reply(null, result)
            })
        }
    })
})