// import s from "./ALLPosts.module.css";
import Post from "./Post/Post";
import React from "react";


const ALLPosts = (props) => {
  
  let PostElement = props.posts.map((p) => (
    <Post message={p.message} LikesCount={p.LikesCount} />
  ));

  let newPostElem = React.createRef(); //ибо нельзя через гет элемент бай айди

  let onAddPost = () => {
    props.addPost()
  }; 
  
  let onPostChange = () => {
    let text = newPostElem.current.value;
    props.updateNewPostText(text)
  };



  return (
    <div>
      <textarea
        onChange={onPostChange}
        ref={newPostElem}
        value={props.newPostText}
      />
      <button onClick={onAddPost}>New Post</button>
      {PostElement}
    </div>
  );
};

export default ALLPosts;

























// в реакт мы никогда не обращаемся к DOM напрямую через документбайайди и прочие ивентлисенеры
//работать нужно только с VirtualDom
/* <button onClick={()=>alert('hi')}>New Post</button>  */
/*  onClick можно на любой элемент(и на див и на текстареа и тд) */
