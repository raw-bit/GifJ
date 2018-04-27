'use strict';

const electron = require('electron')
//const {app, BrowserWindow} = electron
const app = electron.app
const windowManager = require('electron-window-manager')

var mainWindow = null;

app.on('ready', function() {
    
    windowManager.init({
        'appBase': 'main',
        'layouts': {
            'default': 'main/layouts/control.html',
            'display': 'main/layouts/display.html'
        },
        'defaultLayout': 'default',
        'defaultWindowTitle': 'GifJ',
        'onLoadFailure': function(window){
            window.loadURL('/error.html');
        }
    })
    windowManager.open('main', 'GifJ', '/index.html')
    
    var displayWindow = windowManager.createNew('display', 'Display', '/index.html', false, {
        'width': 200,
        'height': 200,
        'position': 'topLeft',
        'layout': 'display',
        'resizable': true
    });
    
     windowManager.open(displayWindow)
});