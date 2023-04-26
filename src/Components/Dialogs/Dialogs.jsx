import s from "./Dialogs.module.css";
import MessagesItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";
import { Field, Form, reduxForm } from "redux-form";
import { Textarea } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Navigate } from "react-router-dom";

const maxLength50=maxLengthCreator(50)
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

  

  let addNewMessage = (data) => {
    //console.log(data.newMessageBody)
    // так как button теперь не имеет сабмиты и прочее, а форма сама сабмитит, поэтому функцию onSendMessageClick суем сюда.
    props.onSendMessageClick(data.newMessageBody);
  };

  if(props.isAuth===false) return <Navigate to={'/login'}/>// редирект если не залогинен

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
        <Field component={Textarea} validate={[required,maxLength50]} name='newMessageBody' placeholder="Пиши сюда!"/>
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
