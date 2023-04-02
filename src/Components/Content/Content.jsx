import s from "./Content.module.css";
import Profile from "./Profile/Profile";
import ALLPosts from "./ALLPosts/ALLPosts";
import ALLPostsContainer from "./ALLPosts/ALLPostsContainer";
const Content = (props) => {
  return (
    <div className={s.Content}>
      <Profile />
      <ALLPostsContainer
        store={props.store}
      />
    </div>
  );
};

export default Content;
