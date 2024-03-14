import { servicesArray } from '../../../constants';
import ServiceCard from './ServiceCard';
import styles from './style.module.css';

const OurServices = () => {
  return (
    <div className={styles.ourServices}>
      <div className={styles.heading}>
        <div
          style={{
            display: 'inline-block',
            backgroundColor: '#f0f0f0',
            color: '#333',
            padding: '10px 20px',
            borderRadius: '20px',
            fontSize: '1.2em',
            boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
            margin: '10px',
            marginTop: '-30px',
          }}
        >
          What We Do
        </div>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h1>Our</h1>
          <h1>Services</h1>
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
