import { connect } from "react-redux";
import {
  followThunk, 
  unFollowThunk,
} from "../../Redux/user-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { getUsersThunkCreator } from "./../../Redux/user-reducer";
import { Navigate } from "react-router-dom";
import { getCurrentPage, getFollowingProgress, getFolowwingProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../Redux/users-selectors";

// ибо реакт делает так let m1=new Users
// let jsx= m1.render
class UsersContainer extends React.Component {
  componentDidMount() {
    // сообщаем что компонента уже вмонтирована. более не нужно делать запросы на сервер
    this.props.getUsers(this.props.currentPage, this.props.pageSize); //но если не передать в параметрах, тоже работает. Ждем typeScript

    // this.props.toggleIsFetching(true)// перед началом запроса для отображения прелоадера
    // usersAPI.getUsers(this.props.currentPage,this.props.pageSize).then((data) => {//в промисе уже дата сидит
    //     this.props.toggleIsFetching(false)//тут уже пришел ответ, передаем фалсе, чтобы прелоадер больше не крутился
    //     this.props.setUsers(data.items);
    //     this.props.setTotalUsersCount(data.totalCount); //получаем общее кол-во людей из апи
    //   });
  }
  onPageChanged = (pageNumber) => {
    //если сюда передать currentPage из AC то всегда будет первая страница. pageNumber-выбранная нами страница
    
    this.props.getUsers(pageNumber, this.props.pageSize);

    // this.props.setCurrentPage(pageNumber);// отправляем в thunk, меняя pageNumber на currentPage там
    // this.props.toggleIsFetching(true);
    // usersAPI.getUsers(pageNumber, this.props.pageSize).then((data) => {
    //   this.props.toggleIsFetching(false);
    //   this.props.setUsers(data.items);
    // });
  };

  render() {
    // обернем <Users/> в <></>
    if(this.props.isAuth===false) return <Navigate to={'/login'}/>
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}

        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged} // тут без пропсов, ибо метод лежит в самом классе!
          users={this.props.users}
          follow={this.props.follow}
          unFollow={this.props.unFollow}
          toggleIsFetching={this.props.toggleIsFetching}
          followingInProgress={this.props.followingInProgress}
          toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
        />
      </>
    );
  } 
}

let mapStateToProps = (state) => {
  return {
    isAuth:state.auth.isAuth,
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingProgress(state),
  };
};

export default connect(mapStateToProps, {
  follow:followThunk,//потом переименовать
  unFollow:unFollowThunk,
  //setUsers, // ушли в thunk
  //setCurrentPage, 
  //setTotalUsersCount,
  //toggleIsFetching,
  //toggleIsFollowingProgress,
  getUsers: getUsersThunkCreator,
})(UsersContainer);










// let mapDispatchToProps = (dispatch) => {

//     return{
//         follow: (userId)=>{dispatch(followAC(userId))},
//         unFollow: (userId)=>{dispatch(unFollowAC(userId))},
//         setUsers: (users)=>{dispatch(setUsersAC(users))},
//         setCurrentPage:(pageNumber)=>{dispatch(setCurrentPageAC(pageNumber))},// !!!уточнить почему!!!!
//         setTotalUsersCount:(totalCount)=>{dispatch(setTotalUsersCountAC(totalCount))},
//         toggleIsFetching:(isFetching)=>{dispatch(toggleIsFetchingAC(isFetching))}
//     }

// }

//const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent);

//если вы передаете в connect вторым аргументом не mapDispatchToProps, а объект с AC,
//то connect оборачивает ваши AC в функцию-обертку () => store.dispatch(AC) и передаёт в props компонента.
