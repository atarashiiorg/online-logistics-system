import style from './style.module.css';
import UpperNavbar from '../../components/landing/upperNavbar';
import Jumbotron from '../../components/landing/Jumbotron';
import OurServices from '../../components/landing/ourServices';
import Testimonials from '../../components/landing/testimonials';
import ContactUs from '../../components/landing/ContactUs';
import Footer from '../../components/landing/footer';
export default function Home() {
  return (
    <main className={style.main}>
      <UpperNavbar />
      <Jumbotron />
      <OurServices />
      <Testimonials/>
      <ContactUs/>
      <Footer/>
    </main>
  );
}
