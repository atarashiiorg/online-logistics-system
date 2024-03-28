import { MdFlight } from 'react-icons/md';
import { GiCargoShip } from 'react-icons/gi';
import { MdLocalShipping } from 'react-icons/md';
export const serverUrl = 'https://q31k0k2w-8000.inc1.devtunnels.ms/api/'
// export const serverUrl = "https://z2nj0ph6-8000.inc1.devtunnels.ms/api/"
// export const serverUrl = "http://127.0.0.1:8000/api/"
 export const publicUrl = 'https://q31k0k2w-8000.inc1.devtunnels.ms/api/'
// export const publicUrl = "https://z2nj0ph6-8000.inc1.devtunnels.ms/api/"
// export const publicUrl = "http://127.0.0.1:8000/"


export const title = 'Safe Dispatch';
export const phone = '123-456-7890';
export const servicesArray = [
  {
    title: 'Air Freight',
    description:
      'We can arrange and provides with the comprehensive service in the sphere of urgent, valuable, fragile or any cargoes conscientious accelerated delivery by air.',
    icon: (
      <MdFlight
        style={{
          color: '#333',
          fontSize: '3.5em',
        }}
      />
    ),
  },
  {
    title: 'Ocean Freight',
    description:
      'We provides with the main types of basic conditions International sea transportation is implemented by our partners’ vessels, the largest ocean carriers.',
    icon: (
      <GiCargoShip
        style={{
          color: '#333',
          fontSize: '3.5em',
        }}
      />
    ),
  },
  {
    title: 'Road Freight',
    description:
      'We provides with the road conditions. The best logistic strategies for delivering your goods and services.',
    icon: (
      <MdLocalShipping
        style={{
          color: '#333',
          fontSize: '3.5em',
        }}
      />
    ),
  },
];
