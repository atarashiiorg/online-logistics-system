import style from './style.module.css';
const Navbar = () => {
  return (
    <div className={style.navbar}>
      
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li
          style={{ width: '1.5px', height: '30px', backgroundColor: '#555' }}
        ></li>
        <li>
          <a href="#">About</a>
        </li>
        <li
          style={{ width: '1.5px', height: '30px', backgroundColor: '#555' }}
        ></li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
