
import { connect } from "react-redux";
import { follow, setUsers,setCurrentPage,setTotalUsersCount, toggleIsFetching } from "../../Redux/user-reducer";
import { unFollow } from "../../Redux/user-reducer";
import React from "react";
import axios from "axios"; 
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";



// ибо реакт делает так let m1=new Users
// let jsx= m1.render
class UsersContainer extends React.Component {
    componentDidMount() {
      // сообщаем что компонента уже вмонтирована. более не нужно делать запросы на сервер
      this.props.toggleIsFetching(true)// перед началом запроса для отображения прелоадера
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
        )
        //page и count в документации https://social-network.samuraijs.com/api/1.0/
        .then((response) => {
          this.props.toggleIsFetching(false)//тут уже пришел ответ, передаем фалсе, чтобы прелоадер больше не крутился
          this.props.setUsers(response.data.items);
          this.props.setTotalUsersCount(response.data.totalCount); //получаем общее кол-во людей из апи
        });
    }
    onPageChanged = (pageNumber) => {
      //если сюда передать currentPage из AC то всегда будет первая страница. pageNumber-выбранная нами страница
      this.props.setCurrentPage(pageNumber);
      
      this.props.toggleIsFetching(true)
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
        )
        //page и count в документации https://social-network.samuraijs.com/api/1.0/
        .then((response) => {
          this.props.toggleIsFetching(false)
          this.props.setUsers(response.data.items);
        });
    };
   debugger;
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
        isFetching:state.usersPage.isFetching
    }
  
}

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


UsersContainer = connect(mapStateToProps, {
  follow,
  unFollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching})(UsersContainer);
export default UsersContainer
