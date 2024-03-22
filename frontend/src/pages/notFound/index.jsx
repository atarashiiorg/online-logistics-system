import style from './style.module.css'
import image_404 from '../../assets/404.jpg'
import { useNavigate } from 'react-router-dom'
export default function NotFound(){
    const navigate = useNavigate()
    return (
        <div className={style.container}>   
            <img src={image_404} alt="404 not found" />
            <button onClick={e=>navigate("/home")}>Go Home</button>
        </div>
    )
}