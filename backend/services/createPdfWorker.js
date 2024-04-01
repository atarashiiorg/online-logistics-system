const puppeteer = require('pdf-puppeteer')
const {parentPort} = require('worker_threads');

parentPort.on('message', async ({html,opts}) => {
    puppeteer(html, (pdf) => {
        parentPort.postMessage(pdf);
        process.exit(1);
    }, opts, {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
        headless:'new'
    });
})
