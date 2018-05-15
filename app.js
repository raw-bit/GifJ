'use strict';

const env = require('node-env-file')
const electron = require('electron')
const app = electron.app

const ipcMain = require('electron').ipcMain;

const windowManager = require('electron-window-manager')
const giphyAPI = process.env.GIFYAPI
env(__dirname + '/.env')

const request = require('request')

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
        showDevTools: true
    })

    var display = windowManager.open('display', 'Display', false, false, {
        'width': 500,
        'height': 500,
        'position': 'bottomRight',
        'layout': 'display',
        'resizable': true,
        'menu': null,
        showDevTools: false
    })

    main.onReady(true, function (window) {
        windowManager.bridge.emit('test', 'test message', display, main)

    })

    windowManager.bridge.on('test', function (event) {
        display.html('<h3>' + event + '</h3>')
    })

    ipcMain.on('search', function (event, data) {
        console.log(giphyAPI)
        if (!data == "") {
            let reqUrl = 'http://api.giphy.com/v1/gifs/search?q=' + data + '&api_key=' + giphyAPI
            request(reqUrl, function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
            });

        }
    })

})