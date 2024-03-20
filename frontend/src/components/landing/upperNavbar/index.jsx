import { useContext } from 'react';
import { phone } from '../../../constants';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { useNavigate, Link } from 'react-router-dom';
import UserAuthContext from '../../../contexts/authContext';
import { message } from 'antd';

const UpperNavbar = (props) => {
  const navigate = useNavigate()
  const {docket, setDocket} = useContext(UserAuthContext)
  const trackThis= ()=>{
      if(docket.length<7){
        message.warning("enter a valid docket number")
        return
      }
      navigate("/track")
  }

  const track = props.track || trackThis
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
      }}
    >
      <div
        style={{
          marginLeft: '2em',
          display: 'flex',
          gap: '0.2em',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
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
