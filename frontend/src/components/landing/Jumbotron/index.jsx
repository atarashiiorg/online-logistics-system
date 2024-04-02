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
          <h2 style={{marginTop:"70px",fontSize:"60px", textTransform:"capitalize"}}>Welcome to our website</h2>
          <h2 style={{fontSize:"25px", textTransform:"capitalize"}}>Safely delivering your cargo with reliability and trust at SafeDispatchLogistics.</h2>
          <img src={logo} alt="Logo" className={style.logo} />
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
