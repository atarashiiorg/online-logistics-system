import { useContext } from 'react';
import { phone } from '../../../constants';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { useNavigate, Link } from 'react-router-dom';
import { message } from 'antd';
import HomeContext from '../../../contexts/homeContext';
import style from './style.module.css'

const UpperNavbar = (props) => {
  const navigate = useNavigate()
  const {docket, setDocket} = useContext(HomeContext)
  const trackThis= ()=>{
      if(docket.length<7){
        message.warning("enter a valid docket number")
        return
      }
      navigate("/track")
  }

  const track = props.track || trackThis
  return (
    <div className={style.container} >
      <div className={style.left}>
        <i
          style={{
            marginRight: '5px',
            color: '#333',
          }}
        >
          <BsFillTelephoneFill />
        </i>
        <a
          href={`tel:+91${phone}`}
          style={{ color: '#333', textDecoration: 'none' }}
        >
          {phone}
        </a>
      </div>
      <div className={style.right}>
        <input
          type="text"
          placeholder="Track"
          style={{
            marginRight: '10px',
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            outline: 'none',
          }}
          value={docket}
          onInput={e=>setDocket(e.target.value)}
        />
        <button
          style={{
            marginRight: '10px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={track}
        >
          Track
        </button>
        <button
          style={{
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={e=>navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default UpperNavbar;