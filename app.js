'use strict';

const env = require('node-env-file')
const electron = require('electron')
const app = electron.app

const windowManager = require('electron-window-manager')
const giphyAPI = process.env.GIFYAPI
env(__dirname + '/.env')

const giphy = require('giphy-api')(giphyAPI)

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
        'resizable': true
    })

    var display = windowManager.open('display', 'Display', false, false, {
        'width': 500,
        'height': 500,
        'position': 'bottomRight',
        'layout': 'display',
        'resizable': true,
        'menu': null
    })

   /* giphy.search('cat').then(function (res) {
        var gifURL = res.data[0].embed_url
        //display.loadURL(gifURL)
        display.html("<div class='container__display' style='background-image: url('" + gifURL + "');'></div>")
    })*/
})