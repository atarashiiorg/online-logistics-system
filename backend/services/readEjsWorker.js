const ejs = require("ejs")
const {parentPort} = require('worker_threads')

parentPort.on('message', async (template,data) => {
    ejs.renderFile(`views/${template}.ejs`, data, (err, html) => {
        err ? parentPort.emit('error',err) : parentPort.postMessage(html)
    })
    process.exit(1);
})
