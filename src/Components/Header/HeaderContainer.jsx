import React from "react";
import Header from "./Header";
import { getAuthUserDataThunk} from "../../Redux/aurth-reducer";
import { connect } from "react-redux";
import { logoutThunk } from './../../Redux/aurth-reducer';


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

export default connect(mapStateToProps,{getAuthUserData:getAuthUserDataThunk,logout:logoutThunk})(HeaderContainer);
