import { connect } from "react-redux";
import s from "./Content.module.css";
import React from "react";
import {
  getStatusThunk,
  getUserProfileThunk,
  savePhotoThunk,
  updateStatusThunk,
} from "./../../Redux/content-reducer";
import Content from "./Content";
import { useNavigate, useParams } from "react-router-dom";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import { compose } from "redux";

//создаем свою функцию withRouter используя хук. в сеья принимает класс ContentContainer
//благодрая этому в this.props придет вкладка match , в из которой useParams достанет id именно из url
export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };

    return <Children {...props} navigate={useNavigate()} match={match} />;
  };
}

class ContentContainer extends React.Component {
  //componentDidMount один из методов жизненного цикла, в котором мы делаем все аякс запросы, чтобы избежать
  //постоянных запросов, сообщаем компоненте-остановись!
  //срабатывает один раз-ПОЭТОМУ после перехода со страницы другого пользователя на свою, картинка остется другого пользователя

  refreshProfile(){
    let userId = this.props.match.params.userId; // из params, которые появляются благодаря useParams
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        //но если даже авторизованного нет, то из пропсов достаем следующее
        this.props.navigate("/login"); //програмный редирект не пашет
      }
    }
    this.props.getUserProfile(userId);

    this.props.getStatus(userId);
  }

  componentDidMount() { this.refreshProfile()
  }

  //поэтому говорим компоненте, что она обновилась, отрисуйся на основе новых пропсов
  componentDidUpdate(prevProps, prevState) {
    if(this.props.match.params.userId!==prevProps.match.params.userId) this.refreshProfile()
  }

  render() {
    return (


      //в пропсы кинем функ-ю санку updateStatus ибо тут мы лишь получим его(get) а там уже обновим
      <div className={s.Content}>
        <Content
          {...this.props}
          isOwner={!this.props.match.params.userId}//если userId не получен из пропсов, значит я владелец, дай кнопку загрузки
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          savePhoto={this.props.savePhoto}
        />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  profile: state.profilePage.profile, //узнали через ssstate.getState()
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
});
//эту функцию есть смысл писать последней, ибо до мы получаем в стейт все нужное,
//и прокидываем по пропсам далее для отрисовки

let WithUrlDataComponent = withRouter(ContentContainer); //в отличии от димыча оберунл в это а не в визроутер

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {
    getUserProfile: getUserProfileThunk,
    getStatus: getStatusThunk,
    updateStatus: updateStatusThunk,
    savePhoto:savePhotoThunk
  })
)(WithUrlDataComponent);
