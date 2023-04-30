import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logoutThunk } from './../../Redux/aurth-reducer';


class HeaderContainer extends React.Component {

  // componentDidMount() {
  // this.props.getAuthUserData()
  // } перенесем в апп

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

export default connect(mapStateToProps,{logout:logoutThunk})(HeaderContainer);
