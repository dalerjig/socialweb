// import s from "./ALLPosts.module.css";
import Post from "./Post/Post";
import React from "react";
import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from "./../../../Redux/content-reducer";
import ALLPosts from "./ALLPosts";

import { connect } from "react-redux";

// const ALLPostsContainer = (props) => {
//   let state = props.store.getState();

//   let addPost = () => {
//     props.store.dispatch(addPostActionCreator());
//     //let text = newPostElem.current.value;
//     //props.updateNewPostText("");
//     //newPostElem.current.value = ""; //для пустой строки
//     //current.value-определенному хтмл элементу
//     //props.AddPost();
//   };

//   let onPostChange = (text) => {
//     // let text = newPostElem.current.value;
//      let action=updateNewPostTextActionCreator(text)
//     props.store.dispatch(action);
//   };

//   return (
//     <ALLPosts
//       addPost={addPost}
//       updateNewPostText={onPostChange}
//       newPostText={state.profilePage.newPostText}
//       posts={state.profilePage.PostData}
//     />
//   );
// };


let mapStateToProps=(state)=> {
  return {
    posts: state.profilePage.PostData,
    newPostText:state.profilePage.newPostText
  };
}
let mapDispatchToProps=(dispatch)=>{ 
  return{
    updateNewPostText:(text)=>{
      let action=updateNewPostTextActionCreator(text)
      dispatch(action)
    },
    addPost:()=>{dispatch(addPostActionCreator())}
  }
}
const ALLPostsContainer=connect(mapStateToProps,mapDispatchToProps)(ALLPosts)//connect умеет работать со стейтом и стором, позволяя мне не работать со store
export default ALLPostsContainer;
// в реакт мы никогда не обращаемся к DOM напрямую через документбайайди и прочие ивентлисенеры
//работать нужно только с VirtualDom
/* <button onClick={()=>alert('hi')}>New Post</button>  */
/*  onClick можно на любой элемент(и на див и на текстареа и тд) */
