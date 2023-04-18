
import s from "./Dialogs.module.css";
import MessagesItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";
import { Navigate } from "react-router-dom";


const Dialogs = (props) => {
  
   //локальный стейт для страницы диалогов
// скорее всего из за локального стейта, отрисовка дублируется???
  let state=props.dialogPage
  let DialogElement = state.DialogData.map((d) => (
    <DialogItem id={d.id} name={d.name} />
  ));
  let MessageElement = state.MessageData.map((m) => (
    <MessagesItem message={m.message} />
  ));

  //let newMessageBody = props.newMessageBody;
 
  let updateNewMessageBody = (e) => {
    let body = e.target.value; //то что введено
    props.updateNewMessage(body)
  };

  let onSendMessageClick = () => {
    props.onSendMessageClick()
  };
  
  if(props.isAuth===false) return <Navigate to={'/login'}/>// редирект если не залогинен
  
  return (
    <div className={s.Dialogs}>
      <div className={s.dialogItems}>{DialogElement}</div>
      <div className={s.messages}>
        <div>{MessageElement}</div>
        <div>         
          <textarea 
            value={state.newMessageBody}
            onChange={updateNewMessageBody}
            placeholder="Пиши сюда!"
          ></textarea>
        </div>
        <div>
          <button onClick={onSendMessageClick}>Отправить</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
