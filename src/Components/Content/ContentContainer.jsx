import { connect } from "react-redux";
import s from "./Content.module.css";
import React from "react";
import { getUserProfileThunk} from './../../Redux/content-reducer';
import Content from "./Content";
import { Navigate, useParams} from "react-router-dom";



//создаем свою функцию withRouter используя хук. в сеья принимает класс ContentContainer
//благодрая этому в this.props придет вкладка match , в из которой useParams достанет id именно из url
export function withRouter(Children){
  return (props)=>{

     const match  = {params: useParams()};
     return <Children {...props}  match = {match}/>
 }
}


class ContentContainer extends React.Component {
  //componentDidMount один из методов жизненного цикла, в котором мы делаем все аякс запросы, чтобы избежать
  //постоянных запросов, сообщаем компоненте-остановись!
  componentDidMount(){
   let userId=this.props.match.params.userId// из params, которые появляются благодаря useParams
   if(!userId) userId=2 // пока тут грузится димыч если не выбран другой профиль
   this.props.getUserProfile(userId)
  }
  
  render() {
    if(this.props.isAuth===false) return <Navigate to={'/login'}/>
    return (//ведет на /profile/u.id из-за навлинка
      <div className={s.Content}>
       
          <Content {...this.props} profile={this.props.profile} />  
      </div>
    );
  }
}

let mapStateToProps=(state)=>({
  isAuth:state.auth.isAuth,
  profile:state.profilePage.profile //узнали через ssstate.getState()
})
//эту функцию есть смысл писать последней, ибо до мы получаем в стейт все нужное, 
//и прокидываем по пропсам далее для отрисовки


let WithUrlDataComponent=withRouter(ContentContainer)
//это HOC, которого больше нет в реакт. Нужны хуки, но хуки нельзя в классах.

export default connect(mapStateToProps,{getUserProfile:getUserProfileThunk})(WithUrlDataComponent)

