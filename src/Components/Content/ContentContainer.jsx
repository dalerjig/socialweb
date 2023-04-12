import { connect } from "react-redux";
import s from "./Content.module.css";
import axios from "axios";
import React from "react";
import { setUserProfile } from './../../Redux/content-reducer';
import Content from "./Content";
import Profile from "./Profile/Profile";

class ContentContainer extends React.Component {
  //componentDidMount один из методов жизненного цикла, в котором мы делаем все аякс запросы, чтобы избежать
  //постоянных запросов, сообщаем компоненте-остановись!
  componentDidMount(){
    axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/profile/2`
        )
        .then((response) => {
          //debugger //лучше тут дебажить чтобы посмотреть что приходит с сервера. С сервера приходит http-обеъкт+информация о разметке
          this.props.setUserProfile(response.data);// объект сидит в дата,через дебаг увидели
         
        });

  }
 
  render() {
    return (//ведет на /profile/u.id из-за навлинка
      <div className={s.Content}>
          <Content {...this.props} profile={this.props.profile} />  
      </div>
    );
  }
}

let mapStateToProps=(state)=>({
  
  profile:state.profilePage.profile //узнали через ssstate.getState()
})
//эту функцию есть смысл писать последней, ибо до мы получаем в стейт все нужное, 
//и прокидываем по пропсам далее для отрисовки

export default connect(mapStateToProps,{setUserProfile})(ContentContainer)

