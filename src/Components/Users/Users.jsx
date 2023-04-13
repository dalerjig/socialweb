import React from "react";
import userPhoto from "../../assets/images/user.png"; //импорт картинки
import s from "./Users.module.css";
import { NavLink } from "react-router-dom";

let Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize); //общее кол-во людей делим на кол-во отображаемых на одной странице, получаем кол-во страниц
  //ceil -округление вверх, чтобы на последней странице тоже выводислся остаток пользователей
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  
  return (
    <div>
      <div>
        {/* если тру то стиль, если не тру то пустая строка(можно &&). Но вместо тру пишем условие currentPage==p */}
        {pages.map((p) => {
          return (
            <span
              onClick={() => props.onPageChanged(p)}
              className={props.currentPage === p && s.selectedPage}
            >
              {p}
            </span>
          );
        })}
      </div>

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
              {u.followed ? (<button onClick={() => {props.unFollow(u.id);}}>Unfollow</button>) 
                             : (<button onClick={() => {props.follow(u.id);}}>Follow</button>)}
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
