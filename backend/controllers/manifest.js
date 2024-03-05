const Manifest = require("../models/manifest")

async function createManifest(req,res){
    try {
      const manifest = await Manifest.create(req.body)
      console.log(manifest)
      if(manifest){
        res.status(201).json(manifest)
      } else {
        res.status(304).json({'msg':'something went wrong'})
      }
    } catch (err) {
        console.log(err);
        res.status(500).json({'err':err})
    }
}

async function getManifests(req,res){
    try {
        let m = {createdAt : new Date().toISOString()}
        if(req.body.dateFrom && req.body.dateTo){
            m.createdAt = {$gte:new Date(req.body.dateFrom), $lte: new Date(req.body.dateTo)}
        }
        const manifests = await Manifest.find(m)
        res.status(200).json(manifests)
    } catch (err) {
        console.log(err)
        res.status(500).json({'err':err})
    }
}

module.exports = {
    createManifest,
    getManifests
}