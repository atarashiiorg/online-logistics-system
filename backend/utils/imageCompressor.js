var Jimp = require("jimp");

const compressImage = (imageBuffer) => {
    return new Promise((resolve, reject) => {
        Jimp.read(imageBuffer, async (err, lenna) => {
            if (err) reject(err);
            const image = lenna
                .resize(1280, 720) // resize
                .quality(60)
                .contrast(.4)
            const buffer = await image.getBufferAsync(Jimp.MIME_JPEG)
            resolve(buffer)
        })
    })
}

module.exports = compressImage