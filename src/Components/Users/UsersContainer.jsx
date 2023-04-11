
import { connect } from "react-redux";
import { followAC, setUsersAC,setCurrentPageAC,setTotalUsersCountAC } from "../../Redux/user-reducer";
import { unFollowAC } from "../../Redux/user-reducer";
import React from "react";
import axios from "axios"; //импорт всего из axios, как объект с названием axios в новой версии без * as
import Users from "./Users";


// ибо реакт делает так let m1=new Users
// let jsx= m1.render
class UsersContainer extends React.Component {
    componentDidMount() {
      // сообщаем что компонента уже вмонтирована. более не нужно делать запросы на сервер
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
        )
        //page и count в документации https://social-network.samuraijs.com/api/1.0/
        .then((response) => {
          this.props.setUsers(response.data.items);
          this.props.setTotalUsersCount(response.data.totalCount); //получаем общее кол-во людей из апи
        });
    }
    onPageChanged = (pageNumber) => {
      this.props.setCurrentPage(pageNumber);
      //!!!видимо для этого, ибо page number получаем при клике и сразе же с этим значением делаем запрос на апи
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
        )
        //page и count в документации https://social-network.samuraijs.com/api/1.0/
        .then((response) => {
          this.props.setUsers(response.data.items);
        });
    };
  
    render() {
      return (
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}// тут без пропсов, ибо метод лежит в самом классе!
          users={this.props.users}
          follow={this.props.follow}
          unFollow={this.props.unFollow}
        />
      );
    }
  }

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage :state.usersPage.currentPage
    }
  
}

let mapDispatchToProps = (dispatch) => {
   
    return{
        follow: (userId)=>{dispatch(followAC(userId))},
        unFollow: (userId)=>{dispatch(unFollowAC(userId))},
        setUsers: (users)=>{dispatch(setUsersAC(users))},
        setCurrentPage:(pageNumber)=>{dispatch(setCurrentPageAC(pageNumber))},// !!!уточнить почему!!!!
        setTotalUsersCount:(totalCount)=>{dispatch(setTotalUsersCountAC(totalCount))}
    }

}

//const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent);
UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
export default UsersContainer
