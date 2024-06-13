const getFormattedManifestReport=(data)=>{
    const reports = data.map((m,i)=>{
        return {
            sno:i+1,
            manifestDate:"",
            manifestNo:"",
            docketNo:"",
            toPayAmount:"",
            cash:"",
            cod:"",
            boxes:"",
            actualWeight:"",
            chargedWeight:"",
            clientName:"",
            consignor:"",
            consignee:"",
            origin:"",
            destination:"",
            vendor:"",
            mode:"",
            pktStatus:"",
            deliveryDate:""
        }
    })
}