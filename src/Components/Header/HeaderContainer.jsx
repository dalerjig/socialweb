import React from "react";
import Header from "./Header";
import { getAuthUserDataThunk, setAuthUserData } from "../../Redux/aurth-reducer";
import { connect } from "react-redux";
import { authAPI } from "../../api/api";

class HeaderContainer extends React.Component {

  componentDidMount() {
  this.props.getAuthUserData()
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

export default connect(mapStateToProps,{getAuthUserData:getAuthUserDataThunk})(HeaderContainer);
