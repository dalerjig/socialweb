import {
  sendMessageActionCreator,
  updateNewMessageBodyActionCreator,
} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";



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
