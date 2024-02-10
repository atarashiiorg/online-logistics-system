import style from './style.module.css'

export default function PodScanUpload(){
    return (
        <>
            <div className={style.note}>
                <h3>Note:</h3>
                <p>1. Please Upload Only Pdf and JPEG File Format .pdf, .tif and .jpg</p>
                <p>2. You can upload Multiple file at a time</p>
            </div>

            <div className={style.form}>
                <input type="file" name="" id="" />
                <span><button>Import</button></span>
                <p>Export Error</p>
                <p>Export Success</p>
            </div>
        </>
    )
}