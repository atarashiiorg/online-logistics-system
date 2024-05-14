import Navbar from './Navbar';
import style from './style.module.css';
import bg from '../../../assets/bg1.jpg'
import logo from '../../../assets/sdlLogo.png'

const Jumbotron = () => {
  return (
    <div className={style.jumbotron} id='home'>
      <Navbar />
      <div className={style.jumbotroncontent}>
        <img src={bg} className={style.bg} />
        <div>
          <h2 className={style.welcome}>Welcome to our website</h2>
          <h2 className={style.h2}>Safely delivering your cargo with reliability and trust at SafeDispatchLogistics.</h2>
          <h3 className={style.h3}>We serve in Haryana, Punjab, Delhi NCR, UP East, Up West, Jammu Kashmir, Uttarakhand, Rajasthan.</h3>
          <img src={logo} alt="Logo" className={style.logo} />
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
