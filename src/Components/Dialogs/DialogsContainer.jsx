import { compose } from "redux";
import {
  sendMessageActionCreator,
  updateNewMessageBodyActionCreator,
} from "../../Redux/dialogs-reducer";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import React from "react";



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


//let AuthRedirectComponent=withAuthRedirect(Dialogs)
//const DialogsContainer=connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponent)//connect умеет работать со стейтом и стором, позволяя мне не работать со store
//connect - возвращает хок.
//export default DialogsContainer;

//при нескольких хоках можно так:

export default compose(
  withAuthRedirect,//можно удалять из цепи рендера без последствий 
  connect(mapStateToProps,mapDispatchToProps)
  
)(Dialogs)
