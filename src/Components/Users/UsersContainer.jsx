
import { connect } from "react-redux";
import { follow, setUsers,setCurrentPage,setTotalUsersCount, toggleIsFetching,toggleIsFollowingProgress } from "../../Redux/user-reducer";
import { unFollow } from "../../Redux/user-reducer";
import React from "react";
import axios from "axios"; 
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { usersAPI } from "../../api/api";




// ибо реакт делает так let m1=new Users
// let jsx= m1.render
class UsersContainer extends React.Component {
  
    componentDidMount() {
      
      // сообщаем что компонента уже вмонтирована. более не нужно делать запросы на сервер
      this.props.toggleIsFetching(true)// перед началом запроса для отображения прелоадера
      usersAPI.getUsers(this.props.currentPage,this.props.pageSize).then((data) => {//в промисе уже дата сидит
          this.props.toggleIsFetching(false)//тут уже пришел ответ, передаем фалсе, чтобы прелоадер больше не крутился
          this.props.setUsers(data.items);
          this.props.setTotalUsersCount(data.totalCount); //получаем общее кол-во людей из апи
        });
    }
    onPageChanged = (pageNumber) => {
      //если сюда передать currentPage из AC то всегда будет первая страница. pageNumber-выбранная нами страница
      this.props.setCurrentPage(pageNumber);
      
      this.props.toggleIsFetching(true)
      usersAPI.getUsers(pageNumber,this.props.pageSize)
        .then((data) => {
          this.props.toggleIsFetching(false)
          this.props.setUsers(data.items);
        });
    };
 
    render() {
      // обернем <Users/> в <></>
      return <>
      
        {this.props.isFetching ? <Preloader/> : null }
        
        <Users 
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}// тут без пропсов, ибо метод лежит в самом классе!
          users={this.props.users}
          follow={this.props.follow}
          unFollow={this.props.unFollow}
          toggleIsFetching={this.props.toggleIsFetching}
          followingInProgress={this.props.followingInProgress}
          toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
          
        />
      </>
    }
  }



let mapStateToProps = (state) => {

    return {
        users: state.usersPage.users,
        pageSize:state.usersPage.pageSize,
        totalUsersCount:state.usersPage.totalUsersCount,
        currentPage:state.usersPage.currentPage,
        isFetching:state.usersPage.isFetching,
        followingInProgress:state.usersPage.followingInProgress,
    }
  
}

export default connect(mapStateToProps, {
  follow,
  unFollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,toggleIsFollowingProgress})(UsersContainer);

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




