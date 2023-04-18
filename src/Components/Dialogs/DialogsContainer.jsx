import {
  sendMessageActionCreator,
  updateNewMessageBodyActionCreator,
} from "../../Redux/dialogs-reducer";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";



let mapStateToProps=(state)=> {
  return {
    dialogPage: state.dialogPage,
    newMessageBody:state.newMessageBody,
   // isAuth:state.auth.isAuth в файле HOC есть уже
  };
}
let mapDispatchToProps=(dispatch)=>{ //диспатч вызывается внутри логики connect
  return{
    updateNewMessage:(body)=>{dispatch(updateNewMessageBodyActionCreator(body))},
    onSendMessageClick:()=>{dispatch(sendMessageActionCreator())}
  }
}


let AuthRedirectComponent=withAuthRedirect(Dialogs)
const DialogsContainer=connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponent)//connect умеет работать со стейтом и стором, позволяя мне не работать со store

export default DialogsContainer;
