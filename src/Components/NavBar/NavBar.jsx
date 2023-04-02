import { NavLink } from "react-router-dom";
import s from "./NavBar.module.css";


const NavBar = () => {
  return (
    <nav className={s.NavBar}>
      <div className={s.item}> 
        <NavLink className = { navData => navData.isActive ? s.active : s.item } to='/profile' >Home</NavLink> 
      </div> 
      <div className={s.item}>
        <NavLink className = { navData => navData.isActive ? s.active : s.item } to='/masseges'>Masseges</NavLink>
      </div>
      <div className={s.item}>
        <NavLink className = { navData => navData.isActive ? s.active : s.item } to='/music'>Music</NavLink>
      </div>
      <div className={s.item}>
        <NavLink className = { navData => navData.isActive ? s.active : s.item } to='/media'>Media</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;



// let s={
//   NavBar: NavBar_NavBar__jkkCh,
//   item: NavBar_item__Ihu4V
// }
/*если нужен стиль,название которого состоит из 2 слов:
<div className='item active'> :
 let c1='item'
 let c2='activ'

 c1+" "+c2
==
'${c1}+${c2}'

и чтобы вставить в разметку:
{'${c1}+${c2}'}

 ТОГДА:
 <div className={'${c.item}+${c.activ}'}

*/

/* Navlink==a*/