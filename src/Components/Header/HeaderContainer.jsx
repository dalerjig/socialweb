import React from "react";
import Header from "./Header";
import axios from "axios";
import { setAuthUserData } from "../../Redux/aurth-reducer";
import { connect } from "react-redux";

class HeaderContainer extends React.Component {

  componentDidMount() {
  
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/auth/me`, //auth/me в документации https://social-network.samuraijs.com/api/1.0/
        { withCredentials:true}//в гет вторым объектом. credentials-реквизиты для входа. Чтобы в одном браузере отправлялись куки на апи
      )
      .then((response) => {
        if(response.data.resultCode===0){//resultCode=0 в докмуентации ==залогинен
          let{id,login,email}=response.data.data// тут id(не userId)ибо в дата на апи именно id
            this.props.setAuthUserData(id,login,email)// первая data-в то что упаковывает аксиос, вторая data-разраб бэка сделал на апи
        }
      });
  }

  render() {
    return <Header {...this.props}  />;
  }
}
let mapStateToProps=(state)=> {
  return {
    isAuth:state.auth.isAuth,
    login:state.auth.login
  }
}

export default connect(mapStateToProps,{setAuthUserData})(HeaderContainer);
