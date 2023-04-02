import {
  updateNewMessageBodyActionCreator,
  sendMessageActionCreator,
} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
  let state = props.store.getState().dialogPage; //sssлокальный стейт для страницы диалогов
  // скорее всего из за локального стейта, отрисовка дублируется???

  let onNewMessageChange = (body) => {
    props.store.dispatch(updateNewMessageBodyActionCreator(body));
  };

  let onSendMessage = () => {
    props.store.dispatch(sendMessageActionCreator());
  };

  return (
    <Dialogs
      updateNewMessage={onNewMessageChange}
      onSendMessageClick={onSendMessage}
      newMessageBody={state.newMessageBody}
      dialogPage={state}
    />
  );
};

export default DialogsContainer;
