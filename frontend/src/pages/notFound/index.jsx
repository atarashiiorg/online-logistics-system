import style from './style.module.css'
import image_404 from '../../assets/404.jpg'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
export default function NotFound(){
    useEffect(()=>{
        document.title = "Page not found 404"
    })
    const navigate = useNavigate()
    return (
        <div className={style.container}>   
            <img src={image_404} alt="404 not found" />
            <button onClick={e=>navigate("/home")}>Go Home</button>
        </div>
    )
}