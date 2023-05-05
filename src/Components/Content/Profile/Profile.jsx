import Preloader from "../../common/Preloader/Preloader";
import React from "react";
import userPNG from "./../../../assets/images/user.png"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import s from "./Profile.module.css"

const Profile = (props) => {
 
  if(!props.profile){//либо null либо undefined
    return <Preloader/>
   }
  
   let onMainPhotoSelected=(e)=>{
      if(e.target.files.length)//проверь не пстой ли массив из выбранных файлов
      props.savePhoto(e.target.files[0])//возьми первый
   }
  
  return (
    <div >
      <div>
         <img src={props.profile.photos.large || userPNG} className={s.avatar}/> 
         {props.isOwner&& <input type={'file'} onChange={onMainPhotoSelected}/>}
         <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
      </div>
    </div>
  );
};
// если я овнер страницы то дай мне возможность грузануть картинку
export default Profile;





