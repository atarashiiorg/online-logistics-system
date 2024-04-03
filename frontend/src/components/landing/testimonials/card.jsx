import { FaUser } from 'react-icons/fa'
import style from './style.module.css'
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";

export const ReviewCard = (props) => {
    return (
        <div className={style.card}>
            <div className={style.image}>
                <FaUser style={{ color: "black", fontSize: "30px" }} />
            </div>
            <div className={style.content}>
                <BiSolidQuoteLeft style={{ position: "absolute", top: "-5px", left: "-5px", fontSize: "28px", color: "grey" }} />
                <p>{props.content}</p>
                <BiSolidQuoteRight style={{ position: "absolute", bottom: "-5px", right: "-5px", fontSize: "28px", color: "grey" }} />
            </div>
            <span>{props.by}</span>
        </div>
    )
}