import Navbar from './Navbar';
import style from './style.module.css';

const Jumbotron = () => {
  return (
    <div className={style.jumbotron}>
      <Navbar />
      <div className={style.jumbotroncontent}>
        <div className={style.bigtext}>
          <h1>Welcome to Our Website</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <button>Explore More</button>
      </div>
    </div>
  );
};

export default Jumbotron;
