import Preloader from "../../common/Preloader/Preloader";
import s from "./Profile.module.css";
import React from "react";

const Profile = (props) => {
  if(!props.profile){//либо null либо undefined
    return <Preloader/>
  }
  
  return (
    <div className={s.item}>
      <img src="https://www.supersadovnik.ru/binfiles/images/20210622/b8bcfafe.jpg" />
      AVA +//

      <div>
         <img src={props.profile.photos.large}/> 
      </div>
    </div>
  );
};

export default Profile;
