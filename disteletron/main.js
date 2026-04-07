import { app, BrowserWindow, desktopCapturer, session, shell, systemPreferences, Tray, Menu } from "electron";
import path from "path";
import { Checkdev } from "./checkdev.js";
import { poll } from "./poll.js";
import { getassets, getpathresolver } from "./pathresolver.js";
import { sendhandlefunction, validateurl } from "./utils/types.js";
import { createapplicationmenu } from "./templetemenu.js";
let tray = null;
app.on("ready", async () => {
    let mainwidth = new BrowserWindow({
        webPreferences: {
            preload: getpathresolver()
        }
    });
    const isMac = process.platform === 'darwin';
    session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
        desktopCapturer.getSources({ types: ['screen'] }).then((sources) => {
            // Grant access to the first screen found.
            console.log(callback);
            console.log(sources);
            callback({ video: sources[0], audio: 'loopback' });
        });
        // If true, use the system picker if available.
        // Note: this is currently experimental. If the system picker
        // is available, it will be used and the media request handler
        // will not be invoked.
    }, { useSystemPicker: true });
    poll(mainwidth);
    const checkMicrophonePermission = async () => {
        const hasMicrophonePermission = systemPreferences.getMediaAccessStatus("microphone") === "granted";
        if (hasMicrophonePermission)
            return;
        if (process.platform === "darwin") {
            const microPhoneGranted = await systemPreferences.askForMediaAccess("microphone");
            if (!microPhoneGranted) {
                shell.openExternal("x-apple.systempreferences:com.apple.preference.security?Privacy_Microphone");
            }
        }
        else if (process.platform === "win32") {
            shell.openExternal("ms-settings:privacy-microphone");
        }
    };
    const checkCameraPermission = async () => {
        const hasCameraPermission = systemPreferences.getMediaAccessStatus("camera") === "granted";
        if (hasCameraPermission)
            return;
        if (process.platform === "darwin") {
            const cameraGranted = await systemPreferences.askForMediaAccess("camera");
            if (!cameraGranted) {
                shell.openExternal("x-apple.systempreferences:com.apple.preference.security?Privacy_Camera");
            }
        }
        else if (process.platform === "win32") {
            shell.openExternal("ms-settings:privacy-webcam");
        }
    };
    sendhandlefunction("getstaticdata", (event) => {
        console.log(event.senderFrame, "is senbet ");
        validateurl(event.senderFrame);
        return { ram: 8, cpu: "applesilicon", os: "mac" };
    });
    console.log(getassets(), "is asets");
    tray = new Tray(path.join(getassets(), "icon.png"));
    console.log(path.join(getassets(), "react.svg"), "is asets path");
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'normal' },
        {
            label: 'Open App',
            click: () => {
                mainwidth.show();
                mainwidth.focus();
            }
        },
        { role: 'quit', click: () => {
                mainwidth.hide();
                if (app.dock) {
                    app.dock.hide();
                }
            } }
    ]);
    mainwidth.webContents.on('context-menu', (_event, params) => {
        const menu = Menu.buildFromTemplate([
            { label: 'Reload', role: 'reload' },
            { label: 'Copy', role: 'copy' },
            { label: 'Paste', role: 'paste' },
            { type: 'separator' },
            { label: 'Inspect', role: 'toggleDevTools' }
        ]);
        console.log(params, "is patamsmsmsmms");
        menu.popup({ window: mainwidth });
    });
    Menu.setApplicationMenu(createapplicationmenu(mainwidth));
    tray.setToolTip('This is  a awebsite maker application ny adhil habeeb .');
    mainwidth.on("close", (e) => {
        e.preventDefault();
        mainwidth.hide();
        if (app.dock) {
            app.dock.hide();
        }
    });
    app.on("before-quit", (e) => {
        e.preventDefault();
        mainwidth.hide();
        if (app.dock) {
            app.dock.hide();
        }
    });
    tray.on("click", (e) => {
        if (mainwidth.isVisible()) {
            mainwidth.hide();
            if (app.dock) {
                app.dock.hide();
            }
        }
        else {
            mainwidth.show();
            // Optional: Bring the window to the front
            mainwidth.focus();
        }
    });
    tray.setContextMenu(contextMenu);
    if (Checkdev()) {
        // Retry loading until Vite dev server is ready
        const tryLoad = async (retries = 10, delay = 1000) => {
            for (let i = 0; i < retries; i++) {
                try {
                    await mainwidth.loadURL("http://localhost:5123/");
                    return;
                }
                catch (err) {
                    console.log(`Vite not ready yet, retrying in ${delay}ms... (${i + 1}/${retries})`);
                    await new Promise(res => setTimeout(res, delay));
                }
            }
            console.error("Failed to load Vite dev server after multiple retries.");
        };
        tryLoad();
    }
    else {
        mainwidth.loadFile(path.join(app.getAppPath(), "/distreactele/index.html"));
    }
});
app.on("quit", () => {
    console.log("quict");
});
