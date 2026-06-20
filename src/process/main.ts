import { Process } from "@nexus-app/nexus-module-builder"
import { session, webContents } from "electron";
import path from 'path';

// These is replaced to the ID specified in export-config.js during export. DO NOT MODIFY.
const MODULE_ID: string = "{EXPORTED_MODULE_ID}";
const MODULE_NAME: string = "{EXPORTED_MODULE_NAME}";
// ---------------------------------------------------

const ICON_PATH: string = path.join(__dirname, "./logo.png")

export default class SampleProcess extends Process {

    private partition: string = `persist:${MODULE_ID}`;

    private userAgent: string = session.fromPartition(this.partition)
        .getUserAgent().replace(/Electron\/*/, '');

    public constructor() {
        super({
            moduleID: MODULE_ID,
            moduleName: MODULE_NAME,
            paths: {
                iconPath: ICON_PATH,
                htmlPath: path.join(__dirname, "../renderer/index.html"),
            }
        });

    }

    public async initialize(): Promise<void> {
        this.sendToRenderer("user-agent", {
            userAgent: this.userAgent,
            partition: this.partition,
        });
    }

    public async handleEvent(eventType: string, data: any[]): Promise<any> {
        switch (eventType) {
            case "init": { // This event is sent from the ../renderer/renderer.ts when the frontend is ready.
                this.initialize();
                break;
            }
            default: {
                console.warn(`[${MODULE_NAME}] Uncaught message: ${eventType} | ${data}`);
                break;
            }
        }
    }

}