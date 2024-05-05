const { rateLimit } = require("express-rate-limit")
const multer = require("multer")

function consoleReq(req, res, next) {
    try {
        var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
        console.log("ip->", ip);
    } catch (error) {
        console.log("error while fetching ip->", error)
    }
    console.log("time->", new Date().toLocaleDateString(), " ", new Date().toLocaleTimeString());
    console.log("url->", req.url);
    console.log("method->", req.method);
    console.log("body->", req.body);
    console.log("cookie->", req.cookies)
    console.log("\n")
    next()
}

const limitReq = rateLimit({
    windowMs: 1000,
    limit: 10,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    validate: { xForwardedForHeader: false }
})

const podUpload=()=>{
    const mStorage = multer.memoryStorage()
    const upload = multer({storage:mStorage})
    return upload.single("pod")
}

module.exports = {
    consoleReq,
    limitReq,
    podUpload
}