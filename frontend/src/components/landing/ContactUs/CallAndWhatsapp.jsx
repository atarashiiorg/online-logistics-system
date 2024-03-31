import { FaWhatsapp } from 'react-icons/fa';
import { BsFillTelephoneOutboundFill } from 'react-icons/bs';

const CallAndWhatsapp = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(250, 250, 250)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        width: '300px',
        margin: '20px auto',
        marginLeft: '0px',
        marginRight: '0px',
      }}
    >
      <h2
        style={{
          fontSize: '1.5em',
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'rgb(60, 60, 60)',
        }}
      >
        Call here
      </h2>
      <p
        style={{
          fontSize: '1.2em',
          fontWeight: 'bold',
          color: 'rgb(60, 60, 60)',
        }}
      >
        +1 234 567 890
      </p>
      <h2
        style={{
          margin: '1em 0',
        }}
      >
        OR
      </h2>
      <a
        style={{
          padding: '10px',
          fontSize: '1.2em',
          fontWeight: 'bold',
          color: 'white',
          backgroundColor: 'rgb(0, 0, 2)',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1em',
        }}
      >
        Click here to Whatsapp
        <FaWhatsapp />
      </a>
      <h2
        style={{
          margin: '1em 0',
        }}
      >
        OR
      </h2>
      <a
        style={{
          padding: '10px',
          fontSize: '1.2em',
          fontWeight: 'bold',
          color: 'white',
          backgroundColor: 'rgb(0, 0, 2)',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1em',
        }}
      >
        Click here to call
        <BsFillTelephoneOutboundFill />
      </a>
    </div>
  );
};

export default CallAndWhatsapp;
