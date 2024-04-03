import style from './style.module.css';
import { ReviewCard } from './card';

const Testimonials = (props) => {
  return (
    <div className={style.testimonials} id='reviews'>
      <h1>What Clients Say About Us</h1>
      <div className={style.right}>
        {
          props?.testimonials?.map(r=><ReviewCard {...r} />)
        }
      </div>
    </div>
  );
};

export default Testimonials;
