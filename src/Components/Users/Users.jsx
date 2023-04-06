import React from "react";

let Users = (props) => {

  if(props.users.length===0){// сначала пустой стейт, далее если он пустой, вызывается метод сетюзерс и заполняет стейт.
    //чтобы избежать зацикливания сетюзерс, ставим проверку.только после нее отрисовывается компонента
  props.setUsers([
    {
        id: 0,
        fullName: "Daler",
        followed: true,
        status: 'lol',
        location: { city: "Dushabe", country: 'TJ' },
        profilePhoto: 'https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,w_200,h_200/lady.jpg'
    },
    {
        id: 1,
        fullName: "July",
        followed: true,
        status: 'here',
        location: { city: "Moscow", country: 'Russia' },
        profilePhoto: 'https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,w_200,h_200/lady.jpg'
    },
    {
        id: 2,
        fullName: "Dior",
        followed: false,
        status: 'lol',
        location: { city: "Zelenograd", country: 'Russia' },
        profilePhoto: 'https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,w_200,h_200/lady.jpg'
    },
    {
        id: 3,
        fullName: "Polina",
        followed: false,
        status: 'lol',
        location: { city: "Zelenograd", country: 'Russia' },
        profilePhoto: 'https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,w_200,h_200/lady.jpg'
    }]
    )
  }

  return (
    
    <div>
      {props.users.map((u) => (
        <div>
          <span>
            <div>
              <img src={u.profilePhoto} />
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
              <div>{u.fullName}</div>
              <div>{u.status}</div>
            </span>

            <span>
               <div>{u.location.country}</div>
              <div>{u.location.city}</div> 
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};
export default Users;
