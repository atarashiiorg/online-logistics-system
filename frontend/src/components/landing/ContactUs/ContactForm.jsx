import { useState } from 'react';
// import sendEmail from "../../sendEmail";

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('New message from your website');
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    );
    const recipient = 'safedispatchlogistics@gmail.com'; // Replace with your email address

    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    // sendEmail(name, email, message); // Call the sendEmail function with the form data
    setName('');
    setEmail('');
    setMessage('');
  };
  return (
    <div>
      <div>
        <div >
          <h1
            style={{
              fontSize: '2em',
              fontWeight: 'bold',
              marginBottom: '32px',
              textAlign: 'center',
            }}
          >
            Mail us
          </h1>
        </div>

        <form onSubmit={handleSubmit} action="/submit" method="post">
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="name"
              style={{
                display: 'block',
                fontWeight: '500',
                marginBottom: '8px',
              }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                outline: 'none',
                width: '20rem',
                color: 'black',
                fontWeight: '500',
                fontSize: '1em',
                padding: '8px',
                borderRadius: '0.375rem',
              }}
              required
              placeholder='Name'
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontWeight: '500',
                marginBottom: '8px',
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                outline: 'none',
                width: '20rem',
                color: 'black',
                fontWeight: '500',
                fontSize: '1em',
                padding: '8px',
                borderRadius: '0.375rem',
                border:"1px solid grey"
              }}
              required
              placeholder='Email'
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="message"
              style={{
                display: 'block',
                fontWeight: '500',
                marginBottom: '8px',
              }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder='Message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                outline: 'none',
                width: '20rem',
                height: '10rem',
                color: 'black',
                fontWeight: '500',
                fontSize: '1em',
                padding: '8px',
                borderRadius: '0.375rem',
                border:"1px solid grey"
              }}
              rows="5"
              required
            ></textarea>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              style={{
                backgroundColor: 'rgb(0,0,2)',
                width: '8rem',
                color: 'white',
                padding: '8px 16px',
                marginRight: '16px',
                borderRadius: '0.375rem',
                border:"none",
                fontWeight: '500',
              }}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ContactForm;
