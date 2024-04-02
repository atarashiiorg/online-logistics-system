import { FaUser } from 'react-icons/fa'
import style from './style.module.css'
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";

export const ReviewCard = (props) => {
    return (
        <div className={style.card}>
            <div className={style.image}>
                <FaUser style={{ color: "black", fontSize: "30px" }} />
            </div>
            <BiSolidQuoteLeft style={{position:"absolute",top:"25px", left:"10px", fontSize:"28px", color:"grey"}} />
            <div className={style.content}>
                <p>{props.content}</p>
            </div>
            <BiSolidQuoteRight style={{position:"absolute",bottom:"70px", right:"10px", fontSize:"28px", color:"grey"}} />
            <span>{props.by}</span>
        </div>
    )
}