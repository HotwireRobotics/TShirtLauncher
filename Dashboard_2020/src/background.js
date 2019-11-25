'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib'
import * as wpilib_NT from 'wpilib-nt-client' ;
import * as logger from './utils/logger';

const client = new wpilib_NT.Client();
client.setReconnectDelay(1000)

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let connectedFunc;
let ready = false;
let clientDataListener = (key, val, valType, mesgType, id, flags) => {
    if (val === 'true' || val === 'false') {
        val = val === 'true';
    }
    win.webContents.send(mesgType, {
        key,
        val,
        valType,
        id,
        flags
    });
};

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {

    // Create the browser window.
    win = new BrowserWindow({ width: 1366, height: 570, webPreferences: {
        nodeIntegration: true
    } })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
        // win.loadURL(`file://${__dirname}/index.html`);
        win.setPosition(0, 0);
    }
    RobotClientConnections();

    win.on('closed', () => {
        win = null;
        ready = false;
        connectedFunc = null;
        client.removeListener(clientDataListener);
    })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
      // Install Vue Devtools
      // Devtools extensions are broken in Electron 6.0.0 and greater
      // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
      // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
      // If you are not using Windows 10 dark mode, you may uncomment these lines
      // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    //   try {
    //     await installVueDevtools()
    //   } catch (e) {
    //     console.error('Vue Devtools failed to install:', e.toString())
    //   }

    }
    logger.logEvent('');
    logger.logEvent('        -----');
    logger.logEvent('Driver Dashboard started');
    createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}


/**
 *  ICP event management for connection to the robot.
 *  You shouldnt need to change anything below this line
 */
function RobotClientConnections() {
    logger.logEvent('Set Robot Connection Events');

    client.start((con, err) => {

        let connectFunc = () => {
            logger.logEvent('Connecting Client to window');
            win.webContents.send('connected', con);
            // Listens to the changes coming from the client
        };
        if(err) {
            logger.logError(err.message);
        }

        // If the Window is ready than send the connection status to it
        if (ready) {
            connectFunc();
        }
        connectedFunc = connectFunc;
    });

    ipcMain.on('ready', (eventName, mesg) => {
        if(mesg) {
            logger.logEvent(eventName + ': ' + mesg.val);
        }
        logger.logEvent('NetworkTables is ready');
        ready = win != null;
        client.removeListener(clientDataListener);
        client.addListener(clientDataListener, true);
        if (connectedFunc) connectedFunc();
    });

    ipcMain.on('connect', (eventName, address, port) => {
        logger.logEvent(`${eventName}: Trying to connect to ${address} ${(port ? ':' + port : '')}`);
        let callback = (connected, err) => {
            if(err) {
                logger.logError(err.message);
            } else {
                logger.logEvent('Connected?');
                win.webContents.send('connected', connected);
            }
        };
        if (port) {
            client.start(callback, address, port);
        } else {
            client.start(callback, address);
        }
    });
    ipcMain.on('add', (eventName, mesg) => {
        logger.logEvent(eventName + ': Connected?');
        client.Assign(mesg.val, mesg.key, (mesg.flags & 1) === 1);
    });
    ipcMain.on('update', (eventName, mesg) => {
        logger.logEvent(eventName + ': ');
        client.Update(mesg.id, mesg.val);
    });
    ipcMain.on('windowError', (eventName, error) => {
        if(error.message) {
            logger.logEvent(eventName + ': ' + error.message);
        }else {
            logger.logError(eventName + ': Unknown error');
        }
    });
}