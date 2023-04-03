import {
  sendMessageActionCreator,
  updateNewMessageBodyActionCreator,
} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";

// const DialogsContainer = (props) => {
//   let state = props.store.getState().dialogPage; //sssлокальный стейт для страницы диалогов
//   // скорее всего из за локального стейта, отрисовка дублируется???

//   let onNewMessageChange = (body) => {
//     props.store.dispatch(updateNewMessageBodyActionCreator(body));
//   };

//   let onSendMessage = () => {
//     props.store.dispatch(sendMessageActionCreator());
//   };

//   return (
//     <Dialogs
//       updateNewMessage={onNewMessageChange}
//       onSendMessageClick={onSendMessage}
//       newMessageBody={state.newMessageBody}
//       dialogPage={state}
//     />
//   );
// };

let mapStateToProps=(state)=> {
  return {
    dialogPage: state.dialogPage,
    newMessageBody:state.newMessageBody
  };
}
let mapDispatchToProps=(dispatch)=>{ //диспатч вызывается внутри логики connect
  return{
    updateNewMessage:(body)=>{dispatch(updateNewMessageBodyActionCreator(body))},
    onSendMessageClick:()=>{dispatch(sendMessageActionCreator())}
  }
}
const DialogsContainer=connect(mapStateToProps,mapDispatchToProps)(Dialogs)//connect умеет работать со стейтом и стором, позволяя мне не работать со store

export default DialogsContainer;
