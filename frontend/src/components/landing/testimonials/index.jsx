import style from './style.module.css';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

const Testimonials = () => {
  return (
    <div className={style.testimonials}>
      <div style={{ width: '40%', display: 'flex', flexDirection: 'column' }}>
        <h1 className={style.title}>Testimonials</h1>
        <div className={style.sideImage}>
          <img
            src="/testimonialside.webp"
            style={{ width: '100%', height: '100%', borderRadius: '1em' }}
            alt=""
          />
        </div>
      </div>
      <div className={style.slick}>
        <div className={style.title}>
          <h1>What people say about us</h1>
        </div>
        <div className={style.sideImage}>
          <img
            src="/testimonialcard.webp"
            style={{ width: '100%', height: '100%', borderRadius: '1em' }}
            alt=""
          />
        </div>
        <div className={style.controls}>
          <button className={style.left}>
            <FaArrowLeftLong style={{ color: 'rgba(0,0,0,0.7)' }} />
          </button>
          <button className={style.right}>
            <FaArrowRightLong style={{ color: 'rgba(0,0,0,0.7)' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
