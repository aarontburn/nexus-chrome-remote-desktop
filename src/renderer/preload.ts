import { webFrame } from "electron";


// Disable the pesky passcode pop-up when a login field is pressed.
// https://github.com/electron/electron/issues/41472#issuecomment-4033561089

const blockCredentialsApiCode = `(() => {
    Object.defineProperty(navigator, 'credentials', {
        value: undefined,
        configurable: true,
        writable: true,
    });
})()`;

webFrame.executeJavaScript(blockCredentialsApiCode);


// let firstClickObserver: MutationObserver | undefined = undefined;
// let pageStatusObserver: MutationObserver | undefined = undefined;

// pageStatusObserver = new MutationObserver(() => {
//     document.querySelectorAll('[aria-label="This device"]').forEach((e) => e.remove())
// })

// firstClickObserver = new MutationObserver(() => {
//     const element = document.getElementById('goog-lr-6');

//     if (element) {
//         pageStatusObserver.observe(element, { attributes: true, childList: true });
//         firstClickObserver?.disconnect();
//     }
// });

// window.addEventListener('beforeunload', () => {
//     firstClickObserver.disconnect();
// });

// window.addEventListener('load', () => {
//     if (window.location.href.includes("remotedesktop.google.com")) {
//         firstClickObserver.observe(document.body, { attributes: true, childList: true });
//     }
// });

window.addEventListener('DOMContentLoaded', () => {
    if (window.location.href.includes("myaccount.google.com")) {
        window.location.href = "https://remotedesktop.google.com";
    }
    // document.querySelectorAll('[aria-label="This device"]').forEach((e) => e.remove());

    // Remove the Google Apps picker
    document.querySelector('[aria-label="Google apps"]')?.parentElement?.remove();
});

