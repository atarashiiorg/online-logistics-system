import style from './style.module.css';
import UpperNavbar from '../../components/landing/upperNavbar';
import Jumbotron from '../../components/landing/Jumbotron';
import OurServices from '../../components/landing/ourServices';
export default function Home() {
  return (
    <main className={style.main}>
      <UpperNavbar />
      <Jumbotron />
      <OurServices />
    </main>
  );
}
