import { MdFlight } from 'react-icons/md';
import { GiCargoShip } from 'react-icons/gi';
import { MdLocalShipping } from 'react-icons/md';
import { RiSecurePaymentFill } from "react-icons/ri"
import { MdSpatialTracking } from "react-icons/md";

// export const serverUrl = 'https://q31k0k2w-8000.inc1.devtunnels.ms/api/'
// export const serverUrl = "https://z2nj0ph6-8000.inc1.devtunnels.ms/api/"
export const serverUrl = `${import.meta.env.VITE_BACKEND_URL}/api/`
//  export const publicUrl = 'https://q31k0k2w-8000.inc1.devtunnels.ms/'
// export const publicUrl = "https://z2nj0ph6-8000.inc1.devtunnels.ms/"
export const publicUrl = `${import.meta.env.VITE_BACKEND_URL}/`


export const title = 'Safe Dispatch';
export const phone = '+91 85709-73368';
export const servicesArray = [
  {
    title: 'Efficient Road Transport',
    description:
      'Welcome to SafeDispatchLogistics, your trusted partner for efficient and reliable road transport solutions. At SafeDispatchLogistics, we understand the importance of flexibility and convenience when it comes to fulfilling your delivery needs.',
    icon: (
      <MdLocalShipping
        style={{
          color: '#333',
          fontSize: '3.5em',
        }}
      />
    ),
  },
  {
    title: ' Variety of Payment Options',
    description:
      "We offer a wide range of payment options to cater to your preferences. Whether you prefer the ease of Cash on Delivery (COD), the convenience of Topay transfers, the security of credit payments, or the speed of online wallets, we've got you covered.",
    icon: (
      <RiSecurePaymentFill
        style={{
          color: '#333',
          fontSize: '3.5em',
        }}
      />
    ),
  },
  {
    title: 'Customer Support',
    description:
      ' Experience personalized assistance and reliable communication throughout your delivery process, ensuring your peace of mind with SafeDispatchLogistics. Our dedicated team is committed to providing exceptional support, guiding you every step of the way to guarantee a smooth and satisfactory experience.',
    icon: (
      <MdSpatialTracking
        style={{
          color: '#333',
          fontSize: '3.5em',
        }}
      />
    ),
  },
];
