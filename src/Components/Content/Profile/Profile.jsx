import Preloader from "../../common/Preloader/Preloader";
import React from "react";
import ProfileStatus from './ProfileStatus'

const Profile = (props) => {
  if(!props.profile){//либо null либо undefined
    return <Preloader/>
   }
  
  return (
    <div >
     тутутутутут мое будет
      <div>
         <img src={props.profile.photos.large}/> 
         
         <ProfileStatus status={'statusAlpha'}/>
      </div>
    </div>
  );
};

export default Profile;
