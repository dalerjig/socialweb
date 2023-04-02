import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css"; //.. на уровень выше

const DialogItem = (props) => {
  return (
    <div className={s.dialog}>
      <NavLink to={"/masseges/" + props.id}>{props.name}</NavLink>{" "}
    </div>
  );
};


export default DialogItem;
