import _403 from '../../assets/403.png';
import style from './style.module.css'
import {Link} from 'react-router-dom'
export function AccessDenied() {
  return (
    <div className={style.container}>
      <img src={_403} alt="Access Denied" className={style.image}/>
      <div className={style.overlay}>
        <h1>We are sorry.</h1>
        <p>The page you are trying to access has restricted access.</p>
        <p>Please refer to your system administrator</p>
        <Link to="/home"> <button>Go Home</button></Link>
      </div>
    </div>
  );
}
