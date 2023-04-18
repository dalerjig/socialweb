import React from "react"
import { Navigate } from "react-router-dom"
import { connect } from "react-redux"

export const withAuthRedirect=(Component)=>{ //HOC
     class RedirectComponent extends React.Component{
        render(){if(this.props.isAuth===false) return <Navigate to={'/login'}/>
        return <Component/>}
    }
    let ConnectedAuthRedirectComponent=connect(mapStateToPropsForRedirectComponent)(RedirectComponent)
    return ConnectedAuthRedirectComponent
}

let mapStateToPropsForRedirectComponent=(state)=> {
    return {
      isAuth:state.auth.isAuth
    };
  }

