import Preloader from "../../common/Preloader/Preloader";
import React from "react";

import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const Profile = (props) => {
  if(!props.profile){//либо null либо undefined
    return <Preloader/>
   }
  
  return (
    <div >
      <div>
         <img src={props.profile.photos.large}/> 
         
         <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
      </div>
    </div>
  );
};

export default Profile;
