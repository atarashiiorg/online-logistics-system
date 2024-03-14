import styles from './style.module.css';

const ServiceCard = ({ Icon, title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        {Icon}
        <h2>{title}</h2>
      </div>
      <hr />
      <p>{description}</p>
    </div>
  );
};

export default ServiceCard;
