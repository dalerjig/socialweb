import React from "react";
import axios from 'axios' //импорт всего из axios, как объект с названием axios в новой версии без * as
import userPhoto from '../../assets/images/user.png' //импорт картинки
let Users = (props) => {

  if(props.users.length===0){// сначала пустой стейт, далее если он пустой, вызывается метод сетюзерс и заполняет стейт.
    //чтобы избежать зацикливания сетюзерс, ставим проверку.только после нее отрисовывается компонента
      axios.get("https://social-network.samuraijs.com/api/1.0/users")
      .then( response=>{ 
       
        props.setUsers(response.data.items)}) //по дебагу ищем
        

      //бывают запросы типа get post put delete. По ссылке можно увидеть json файл.
      //после реквеста на сервер, респонз приходит не сразу 
      // json файл-объект в котором ключи в ковычках
    // props.setUsers([
    // {
    //     id: 0,
    //     fullName: "Daler",
    //     followed: true,
    //     status: 'lol',
    //     location: { city: "Dushabe", country: 'TJ' },
    //     profilePhoto: 'https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,w_200,h_200/lady.jpg'
    // },
    // {
    //     id: 1,
    //     fullName: "July",
    //     followed: true,
    //     status: 'here',
    //     location: { city: "Moscow", country: 'Russia' },
    //     profilePhoto: 'https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,w_200,h_200/lady.jpg'
    // },
    // {
    //     id: 2,
    //     fullName: "Dior",
    //     followed: false,
    //     status: 'lol',
    //     location: { city: "Zelenograd", country: 'Russia' },
    //     profilePhoto: 'https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,w_200,h_200/lady.jpg'
    // },
    // {
    //     id: 3,
    //     fullName: "Polina",
    //     followed: false,
    //     status: 'lol',
    //     location: { city: "Zelenograd", country: 'Russia' },
    //     profilePhoto: 'https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,w_200,h_200/lady.jpg'
    // }]
    // )
  }

  return (
    
    <div>
      {props.users.map((u) => (
        <div>
          <span>
            <div>
              <img src={u.photos.small!= null?u.photos.small: userPhoto} />
            </div>
            
            <div>
              
               {u.followed 
               ?<button onClick={()=>{props.unFollow(u.id)}}>Unfollow</button>
               :<button onClick={()=>{props.follow(u.id)}}>Follow</button>
               }  
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
};
export default Users;
