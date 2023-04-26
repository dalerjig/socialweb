// import s from "./ALLPosts.module.css";

import { Field, Form, reduxForm } from "redux-form";
import Post from "./Post/Post";
import React from "react";


const ALLPosts = (props) => {
  
  let PostElement = props.posts.map((p) => (
    <Post message={p.message} LikesCount={p.LikesCount} />
  ));

  //let newPostElem = React.createRef(); //ибо нельзя через гет элемент бай айди

  let onAddPost = (values) => {
    console.log(values.newPostText)
    props.addPost(values.newPostText)
  }; 
  
  // let onPostChange = () => {
  //   let text = newPostElem.current.value;
  //   props.updateNewPostText(text)
  // };



  return (
    <div>
    <AddNewPostFormRedux onSubmit={onAddPost}/>
      <div>
      {PostElement}
    </div>
    </div>
  );
};

let AddNewPostForm=(props)=>{
  
  return <Form onSubmit={props.handleSubmit}>
   
   <Field component='textarea' name="newPostText"/>  {/* в// name обязтельно newPostText!! */}
  {/* <textarea
    onChange={onPostChange}
    ref={newPostElem}
    value={props.newPostText}
  /> */}
  <button>New Post</button>
  </Form>
}

const AddNewPostFormRedux=reduxForm({form:'ProfileaddNewPostForm'})(AddNewPostForm)

export default ALLPosts;

























// в реакт мы никогда не обращаемся к DOM напрямую через документбайайди и прочие ивентлисенеры
//работать нужно только с VirtualDom
/* <button onClick={()=>alert('hi')}>New Post</button>  */
/*  onClick можно на любой элемент(и на див и на текстареа и тд) */
