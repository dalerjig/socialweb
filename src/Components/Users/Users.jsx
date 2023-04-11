import React from "react";
import axios from "axios"; //импорт всего из axios, как объект с названием axios в новой версии без * as
import userPhoto from "../../assets/images/user.png"; //импорт картинки
import s from "./Users.module.css";

// ибо реакт делает так let m1=new Users
// let jsx= m1.render
class Users extends React.Component {
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
    let pagesCount = Math.ceil(
      this.props.totalUsersCount / this.props.pageSize
    ); //общее кол-во людей делим на кол-во отображаемых на одной странице, получаем кол-во страниц
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
                onClick={() => this.onPageChanged(p)}
                className={this.props.currentPage === p && s.selectedPage}
              >
                 {p} 
                 
              </span>
            );
          })}
        </div>

        {this.props.users.map((u) => (
          <div>
            <span>
              <div>
                <img
                  className={s.userPhoto}
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                />
              </div>

              <div>
                {u.followed ? (
                  <button
                    onClick={() => {
                      this.props.unFollow(u.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.props.follow(u.id);
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
            </span>

            <span>
              <span>
                <div>{u.name}</div>
                {/* меняем фулнейм на нейм как в апи */}
                <div>{u.status}</div>
              </span>

              <span>
                <div>{"u.location.country"}</div>
                {/* так как в апи нет ключа локейшн */}
                <div>{"u.location.city"}</div>
              </span>
            </span>
          </div>
        ))}
      </div>
    );
  }
}
export default Users;
