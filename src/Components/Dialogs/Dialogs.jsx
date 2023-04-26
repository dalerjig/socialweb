import s from "./Dialogs.module.css";
import MessagesItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";
import { Navigate } from "react-router-dom";
import { Field, Form, reduxForm } from "redux-form";


const Dialogs = (props) => {
  //локальный стейт для страницы диалогов
  // скорее всего из за локального стейта, отрисовка дублируется???
  let state = props.dialogPage;
  let DialogElement = state.DialogData.map((d) => (
    <DialogItem id={d.id} name={d.name} />
  ));
  let MessageElement = state.MessageData.map((m) => (
    <MessagesItem message={m.message} />
  ));

  //let newMessageBody = props.newMessageBody;

  // let updateNewMessageBody = (e) => {
  //   let body = e.target.value; //то что введено
  //   props.updateNewMessage(body);
  // };
  //теперь каждый символ не нужно обрабатывать, это делает редуксФорм

  // let onSendMessageClick = () => {
  //   props.onSendMessageClick();
  // };

  let addNewMessage = (data) => {
    //console.log(data.newMessageBody)
    // так как button теперь не имеет сабмиты и прочее, а форма сама сабмитит, поэтому функцию onSendMessageClick суем сюда.
    props.onSendMessageClick(data.newMessageBody);
  };

  //if(props.isAuth===false) return <Navigate to={'/login'}/>// редирект если не залогинен

  return (
    <div className={s.Dialogs}>
      <div className={s.dialogItems}>{DialogElement}</div>
      <div className={s.messages}>
        <div>{MessageElement}</div>
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage}/>
    </div>
  );
};

const AddMessageForm = (props) => {
  return (
    <Form onSubmit={props.handleSubmit}>
      <div>
        <Field component='textarea' name='newMessageBody' placeholder="Пиши сюда!"/>
        {/* <textarea value={state.newMessageBody} onChange={updateNewMessageBody} placeholder="Пиши сюда!"></textarea> */}
      </div>
      <div>
        <button>Отправить</button>
      </div>
    </Form>
  );
};

const AddMessageFormRedux=reduxForm({form:'dialogAddMessageForm'})(AddMessageForm)
//storee.getState().form теперь имеет объект со свойством dialogAddMessageForm-это redux-form-state
export default Dialogs;
