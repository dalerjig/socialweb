import { connect } from "react-redux";
import { followThunk, unFollowThunk } from "../../Redux/user-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { getUsersThunkCreator } from "./../../Redux/user-reducer";
import { Navigate } from "react-router-dom";
import {
  getCurrentPage,
  getFollowingProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "../../Redux/users-selectors";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize); //но если не передать в параметрах, тоже работает. Ждем typeScript
  }
  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    if (this.props.isAuth === false) return <Navigate to={"/login"} />;
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
    isAuth: state.auth.isAuth,
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingProgress(state),
  };
};

export default connect(mapStateToProps, {
  follow: followThunk, //потом переименовать
  unFollow: unFollowThunk,

  getUsers: getUsersThunkCreator,
})(UsersContainer);
