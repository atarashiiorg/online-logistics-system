import ContactForm from './ContactForm';
import CallAndWhatsapp from './CallAndWhatsapp';
import style from './style.module.css'
const ContactUs = () => {
  return (
    <div id='contactus' className={style.container} >
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
      <div className={style.content} >
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
            className={style.girlImage}
          />
        </div>
        <CallAndWhatsapp />
      </div>
    </div>
  );
};
export default ContactUs;
