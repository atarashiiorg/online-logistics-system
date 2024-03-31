import { servicesArray } from '../../../constants';
import ServiceCard from './ServiceCard';
import styles from './style.module.css';

const OurServices = () => {
  return (
    <div className={styles.ourServices}>
      <div className={styles.heading}>
        <div
          style={{
            alignItems: 'center',
          }}
        >
          <h1>Our Services</h1>
        </div>
      </div>
      <div className={styles.cards}>
        {servicesArray.map((service, index) => (
          <ServiceCard
            key={index}
            Icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
};

export default OurServices;
