import React from "react";
import axios from "axios"; //импорт всего из axios, как объект с названием axios в новой версии без * as
import userPhoto from "../../assets/images/user.png"; //импорт картинки

class Users extends React.Component {

  componentDidMount() {
    // сообщаем что компонента уже вмонтирована. более не нужно делать запросы на сервер
    axios
      .get("https://social-network.samuraijs.com/api/1.0/users")
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  }

  render() {
    // ибо реакт делает так let m1=new Users
    // let jsx= m1.render
    return (
      <div>
        <div>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
        {this.props.users.map((u) => (
          <div>
            <span>
              <div>
                <img
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
