import s from "./Content.module.css";
import Profile from "./Profile/Profile";
import ALLPosts from "./ALLPosts/ALLPosts";
import ALLPostsContainer from "./ALLPosts/ALLPostsContainer";
import React from "react";

class ContentContainer extends React.Component {
  render() {
    return (
      <div className={s.Content}>
        <Profile {...this.props} />
      </div>
    );
  }
}

export default ContentContainer;
