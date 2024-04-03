import ContactForm from './ContactForm';
import CallAndWhatsapp from './CallAndWhatsapp';
const ContactUs = () => {
  return (
    <div
      style={{
        padding: '2em 3em 2.5em 3em',
        backgroundColor: 'rgb(250, 250, 250)',
      }}
      id='contactus'
    >
      <h1
        style={{
          fontSize: '2.5em',
          fontWeight: 'bold',
          marginBottom: '32px',
          textAlign: 'center',
        }}
      >
        Contact Us
      </h1>
      <div
        style={{
          display: 'flex',
          gap: '2em',
          justifyContent: 'center',
          width: '100%',
          // alignItems: 'center',
        }}
      >
        <ContactForm />
        <div
          className=""
          style={{
            width: '40%',
            height: '100%',
            borderRadius: '10px',
            overflow: 'hidden',
            objectFit: 'cover',
          }}
        >
          <img
            src="/girlShowingtwoHands.webp"
            alt="girlShowingtwohands"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
        <CallAndWhatsapp />
      </div>
    </div>
  );
};
export default ContactUs;
