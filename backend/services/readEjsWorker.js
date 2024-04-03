// const ejs = require("ejs")
// const {parentPort} = require('worker_threads')

// parentPort.on('message', async (template,data) => {
//     ejs.renderFile(`views/${template}.ejs`, data, (err, html) => {
//         err ? parentPort.emit('error',err) : parentPort.postMessage(html)
//     })
//     process.exit(1);
// })


const ejs = require("ejs");
const { parentPort } = require('worker_threads');

parentPort.on('message', async (message) => {
    const { template, data } = message;

    try {
        const html = await renderEjs(template, data);
        parentPort.postMessage(html);
    } catch (err) {
        parentPort.emit('error', err);
    }
});

async function renderEjs(template, data) {
    return new Promise((resolve, reject) => {
        ejs.renderFile(`views/${template}.ejs`, data, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });
}
