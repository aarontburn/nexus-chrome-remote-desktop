// Sends information to the the process.
const sendToProcess = (eventType: string, ...data: any[]): Promise<void> =>
    window.ipc.sendToProcess(eventType, data);


// Attach event handler.
window.ipc.onProcessEvent((eventType: string, data: any[]) => {
    switch (eventType) {
        case "user-agent": {
            // Create the webview
            const { userAgent, partition } = data[0];

            const url: string = "https://remotedesktop.google.com";
            const html: string = `
                <webview 
                    allowpopups
                    src="${url}"
                    partition="${partition}" 
                    userAgent="${userAgent}"
                    preload="./preload.js"
                ></webview>
            `
            document.getElementById("app")!.insertAdjacentHTML('beforeend', html);
            break;
        }
        default: {
            console.warn(`Uncaught message: ${eventType} | ${data}`);
        }
    }
});

sendToProcess("init");
