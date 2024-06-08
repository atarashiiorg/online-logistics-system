import Navbar from './Navbar';
import style from './style.module.css';
import bg from '../../../assets/bg1.jpg'
import logo from '../../../assets/sdlLogo.png'
import { MdPinDrop } from 'react-icons/md';

const Jumbotron = () => {
  return (
    <div className={style.jumbotron} id='home'>
      <Navbar />
      <div className={style.jumbotroncontent}>
        <img src={bg} className={style.bg} />
        <div className={style.container}>
          <h2 className={style.welcome}>Welcome to our website</h2>
          <h2 className={style.h2}>Safely delivering your cargo with reliability and trust at SafeDispatchLogistics.</h2>
          <h3 className={style.h2} style={{
            marginBlock:"5px"
          }}>We serve in Haryana, Punjab, Delhi NCR, UP East, Up West, Jammu Kashmir, Uttarakhand, Rajasthan.</h3>
          <img src={logo} alt="Logo" className={style.logo} />
          <h3 className={style.address}><MdPinDrop className={style.pin} /> SCO 52, New grain market,near Jalandhar bypass Ludhiana 141008</h3>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
