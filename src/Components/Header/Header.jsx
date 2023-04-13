import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = (props) => {
 
  return (
    <header className={s.Header}>
      <img src="https://t3.ftcdn.net/jpg/03/76/71/56/360_F_376715648_5ccyFl7n92LV4tU5O6B5sfsrBCagISDE.jpg" />

      <div className={s.loginBlock}>
        {props.isAuth ? props.login : <NavLink to={"/login"}> login</NavLink>}
      </div>
    </header>
  );
};

export default Header;
