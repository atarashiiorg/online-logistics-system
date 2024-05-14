import { FaEnvelope, FaMailchimp, FaMobile, FaPhone, FaPhoneAlt } from 'react-icons/fa';
import styles from './style.module.css';
import {Link} from 'react-router-dom'

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
          <ul className={styles.mb4} style={{ listStyle: "none" }}>
            <li className={styles.mt2}>
              <a
                href="#"
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
              >
                Track Docket
              </a>
            </li>
            <li className={styles.mt2}>
              <Link
                to="/home"
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
              >
                Home
              </Link>
            </li>
          </ul>
        </div>

        <div className={`${styles.wideColumn} ${styles.narrowColumn}`}>
          <h2
            className={`${styles.uppercase} ${styles.mt4} ${styles.mb2} ${styles.fontBold}`}
          >
            Location
          </h2>
          <ul className={styles.mb4} style={{ listStyle: "none" }}>
            <li className={styles.mt2}>
              <span
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
              >
                Haryana
              </span>
            </li>
            <li className={styles.mt2}>
              <span
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
              >
                Punjab
              </span>
            </li>
            <li className={styles.mt2}>
              <span
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
              >
                Rajasthan
              </span>
            </li>
            <li className={styles.mt2}>
              <span
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
              >
                Delhi NCR
              </span>
            </li>
            <li className={styles.mt2}>
              <span
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
              >
                UP East
              </span>
            </li>
            <li className={styles.mt2}>
              <span
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
              >
                Up West
              </span>
            </li>
            <li className={styles.mt2}>
              <span
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
              >
                Uttarakhand
              </span>
            </li>
            <li className={styles.mt2}>
              <span
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
              >
                Jammu Kashmir
              </span>
            </li>
          </ul>
        </div>

        <div className={`${styles.wideColumn} ${styles.narrowColumn}`}>
          <h2
            className={`${styles.uppercase} ${styles.mt4} ${styles.mb2} ${styles.fontBold}`}
          >
            Contact
          </h2>
          <ul className={styles.mb4} style={{ listStyle: "none" }}>
            <li className={styles.mt2} style={{ width: "100%" }}>
              <span
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <FaPhoneAlt /> +91 85709-73368
              </span>
            </li>
            <li className={styles.mt2}>
              <span
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <FaEnvelope /> safedispatchlogistics@gmail.com
              </span>
            </li>
            <li className={styles.mt2}>
              <span
                className={`${styles.hoverUnderline} ${styles.textGray200}`}
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <FaEnvelope /> director.safedispatchlogistics@gmail.com
              </span>
            </li>
          </ul>
        </div>

        {/* <div
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
        </div> */}
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
          &copy; {new Date().getFullYear()} Safedispatchlogistics. All rights
          reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
