import style from './style.module.css';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import {reviewsArray} from '../../../constants'
import { ReviewCard } from './card';

const Testimonials = () => {
  return (
    <div className={style.testimonials} id='reviews'>
      <h1>Customer Reviews & Testimonials</h1>
      <div className={style.right}>
        {
          reviewsArray.map(r=><ReviewCard {...r} />)
        }
      </div>
    </div>
  );
};

export default Testimonials;
