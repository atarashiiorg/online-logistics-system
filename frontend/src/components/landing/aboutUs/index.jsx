import style from './style.module.css'
import image from '../../../assets/loginBg1.png'

export const AboutUs = (props) => {
    return (
        <div className={style.aboutus} id='aboutus'>
            <h1>About Us</h1>
            <div className={style.content}>
                <div className={style.left}>
                    <div className={style.r1c1}></div>
                    <div className={style.r1c2}></div>
                    <div className={style.r2c1}></div>
                    <div className={style.r2c2}></div>

                    <img src={image} alt='Some image' className={style.image} />
                </div>
                <div className={style.right}>
                    <p>
                        Safe Dispatch Logistics is a trusted provider of comprehensive logistics solutions, dedicated to ensuring the efficient and secure transportation of goods worldwide. With a commitment to reliability, safety, and customer satisfaction, we specialize in delivering tailored logistics services to meet the unique needs of our clients across various industries.
                    </p>

                    <p>
                        Our team consists of seasoned professionals with extensive experience in the logistics and transportation sector. Leveraging industry expertise and cutting-edge technology, we streamline supply chain operations and optimize routes to minimize costs and maximize efficiency.
                    </p>
                    <p>
                        At Safe Dispatch Logistics, we understand the importance of timely delivery and strive to exceed our clients' expectations at every step of the process. Whether it's freight forwarding, warehousing, distribution, or customs clearance, we provide end-to-end solutions to ensure seamless delivery of goods to their destination.
                    </p>
                    <p>
                        With a global network of partners and a dedication to continuous improvement, Safe Dispatch Logistics is your trusted partner for all your logistics needs. Contact us today to discover how we can help streamline your supply chain and drive your business forward.
                    </p>
                </div>
            </div>
        </div>
    )
}