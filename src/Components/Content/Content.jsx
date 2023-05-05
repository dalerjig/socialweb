import s from "./Content.module.css";
import Profile from "./Profile/Profile";
import ALLPostsContainer from "./ALLPosts/ALLPostsContainer";

const Content = (props) => {
  return (
    <div className={s.Content}>
      <Profile isOwner={props.isOwner}savePhoto={props.savePhoto} profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
      <ALLPostsContainer/>
    </div>
  );
};

export default Content;
