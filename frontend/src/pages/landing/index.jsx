import style from './style.module.css';
import UpperNavbar from '../../components/landing/upperNavbar';
import Jumbotron from '../../components/landing/Jumbotron';
import OurServices from '../../components/landing/ourServices';
import Testimonials from '../../components/landing/testimonials';
import ContactUs from '../../components/landing/ContactUs';
import Footer from '../../components/landing/footer';
import Loading from '../../pages/loading'
import { AboutUs } from '../../components/landing/aboutUs';
import { useEffect, useState } from 'react';
import { publicUrl } from '../../constants';
import { message } from 'antd';
export default function Home() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    (async()=>{
      setLoading(true)
      const res = await fetch(publicUrl+"testimonials")
      const json = await res.json()
      if(res.ok){
        setTestimonials(p=>[...json.data])
      } else if(res.status==500){
        message.error("server error occured")
      } else {
        message.error(json.msg)
      }
      setLoading(false)
    })()
  },[])
  return (
    <main className={style.main}>
      {
        loading?<Loading/>:null
      }
      <UpperNavbar />
      <Jumbotron />
      <AboutUs/>
      <OurServices />
      <Testimonials testimonials={testimonials}/>
      <ContactUs/>
      <Footer/>
    </main>
  );
}
