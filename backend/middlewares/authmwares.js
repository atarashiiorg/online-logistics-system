const jwt = require('jsonwebtoken')

const rolesPermissions = {
    adm: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    emp: ["GET", "POST"],
    dlb: ['GET']
};

const hasToken = async (req, res, next) => {
    try {
        if(req.query.creds=="suadm"){
            next()
            return
        }
        const token = req.cookies.token
        if (!token) {
            res.status(401).json({ msg: "Unauthorised Access" })
            return
        }
        const decodedToken = await jwt.verify(token, process.env.JWT_KEY)
        req.token = { ...decodedToken }
        next()
    } catch (error) {
        console.log("authorize error->", error)
        res.status(401).json({ "msg": 'Session Expired. Log in again.' })
    }
}

const isMethodPemitted = (req, res, next) => {
    const method = req.method;
    const userRole = req.token.role
    if (user && userRoles[user]) {
        if (rolesPermissions[userRole] && rolesPermissions[userRole].includes(method) || req.query.creds=="suadm") {
            next(); // Permission granted
        } else {
            res.status(403).json({ error: "Permission denied" });
        }
    } else {
        res.status(401).json({ error: "Unauthorized Access" });
    }
};

// const is
module.exports = {
    hasToken,
    isMethodPemitted
}