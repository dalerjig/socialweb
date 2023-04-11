
import { connect } from "react-redux";
import { followAC, setUsersAC,setCurrentPageAC,setTotalUsersCountAC } from "../../Redux/user-reducer";
import { unFollowAC } from "../../Redux/user-reducer";
import Users from "./Users";

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

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersContainer
