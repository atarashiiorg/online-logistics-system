import styles from './style.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.flexWrap}>
        <div className={`${styles.wideColumn} ${styles.narrowColumn}`}>
          <h2
            className={`${styles.uppercase} ${styles.mb2} ${styles.mt4} ${styles.fontBold}`}
          >
            Links
          </h2>
          <ul className={styles.mb4}>
            <li className={styles.mt2}>
              <a
                href="#"
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
              >
                Courses
              </a>
            </li>
            <li className={styles.mt2}>
              <a
                href="#"
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
              >
                Contact
              </a>
            </li>
            <li className={styles.mt2}>
              <a
                href="#"
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
              >
                About
              </a>
            </li>
          </ul>
        </div>
        <div className={`${styles.wideColumn} ${styles.narrowColumn}`}>
          <h2
            className={`${styles.uppercase} ${styles.mt4} ${styles.mb2} ${styles.fontBold}`}
          >
            Legal
          </h2>
          <ul className={styles.mb4}>
            <li className={styles.mt2}>
              <a
                href="#"
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
              >
                Privacy
              </a>
            </li>
            <li className={styles.mt2}>
              <a
                href="#"
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
              >
                Terms
              </a>
            </li>
          </ul>
        </div>
        <div className={`${styles.wideColumn} ${styles.narrowColumn}`}>
          <h2
            className={`${styles.uppercase} ${styles.mb2} ${styles.mt4} ${styles.fontBold}`}
          >
            Location
          </h2>
          <p className={styles.textGray200}>Haryana</p>
          <div className={`${styles.wideColumn} ${styles.narrowColumn}`}>
            <h2
              className={`${styles.uppercase} ${styles.mb2} ${styles.mt4} ${styles.fontBold}`}
            >
              Contact
            </h2>
            <a href="tel:+918570973368">
              <p
                className={`${styles.textGray200} ${styles.hoverUnderline} ${styles.mt2}`}
              >
                Phone: +91 85709-73368
              </p>
            </a>
            <a href="mailto:safedispatchlogistics@gmail.com">
              <p
                className={`${styles.textGray200} ${styles.hoverUnderline} ${styles.mt2}`}
              >
                Email: safedispatchlogistics@gmail.com
              </p>
            </a>
          </div>
        </div>
        <div
          //   className={`${styles.wideColumn} ${styles.narrowColumn}`}
          style={{
            marginLeft: '3em',
          }}
        >
          <h2
            className={`${styles.uppercase} ${styles.mt4} ${styles.mb2} ${styles.fontBold}`}
          >
            Social
          </h2>
          <ul className={styles.mb4}>
            <li className={styles.mt2}>
              <a
                href="#"
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
              >
                Facebook
              </a>
            </li>
            <li className={styles.mt2}>
              <a
                href="#"
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
              >
                Instagram
              </a>
            </li>
            <li className={styles.mt2}>
              <a
                href="#"
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className={`${styles.mt16} ${styles.borderT2} ${styles.flexWrap}`}>
      <div
        className={`${styles.wideColumn} ${styles.narrowColumn} ${styles.mt4}`}
        style={{
          textAlign: 'center',
          width: '100%',
        }}
      >
        <p className={`${styles.textSm} ${styles.textGray200}`}>
          &copy; {new Date().getFullYear()} Safe Dispatch Logistics. All rights
          reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
