import React from "react";
import userPhoto from "../../assets/images/user.png"; //импорт картинки
import s from "./Users.module.css";
import { NavLink } from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";


let Users = (props) => {


  return (
    <div>
       <div><Paginator 
            onPageChanged={props.onPageChanged} 
            totalUsersCount={props.totalUsersCount}
            currentPage={props.currentPage}
            pageSize={props.pageSize}/></div> 

      {props.users.map((u) => (
        <div>
          <span>
            <div>
              <NavLink to={"/profile/" + u.id}>
                <img
                  className={s.userPhoto}
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                />
              </NavLink>
            </div>

            <div>
              {u.followed 
              ? (<button
                  disabled={props.followingInProgress.some((id) => id === u.id)} //если тру, выруби конпку
                  onClick={() => {props.unFollow(u.id)}}
                > Unfollow </button>) 
              : (<button
                  disabled={props.followingInProgress.some((id) => id === u.id)} //примени только к тем id,пришедшим из массива followingInProgress, на кого кликаю, сравнивая по id
                  onClick={() => {props.follow(u.id)}}
                >Follow</button>
              )}
            </div>
          </span>

          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>

            <span>
              <div>{"u.location.country"}</div>
              <div>{"u.location.city"}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};
export default Users;


