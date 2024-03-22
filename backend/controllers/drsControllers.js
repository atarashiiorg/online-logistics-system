const {getRunsheetNumber} = require("../services/helpers")

async function getRunsheets(req,res){
    try {
        const runsheetNumber = await getRunsheetNumber()
        res.status(200).json({'msg':'success',data:runsheetNumber})
    } catch (error) {
        res.status(500).json({err:error})
    }
}

module.exports = {
    getRunsheets
}