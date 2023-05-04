// import s from "./ALLPosts.module.css";

import { Field, Form, reduxForm } from "redux-form";
import Post from "./Post/Post";
import React from "react";
import {  maxLengthCreator, required } from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

const maxLength10=maxLengthCreator(10)//вне компоненты, иначе создание функции будет постоянным из за переренжера

class ALLPosts extends React.PureComponent {

    // так как у нас не реализованы реальные посты, ограничиваем обновление компоненты
  // shouldComponentUpdate(nextProps,nextState){
  //   return nextProps!=this.props || nextState!=this.state
  // } 
  // а можно просто наследоваться от PureComponent
// А МОЖНО ОБЕРНУТЬ AllPosts в React.memo(AllPosts)

render(){
  console.log('renderrr')// сработает один раз из за PureComponent
  let PostElement = this.props.posts.map((p) => (
    <Post message={p.message} LikesCount={p.LikesCount} />
  ));

 
  let onAddPost = (values) => {
    this. props.addPost(values.newPostText);
  };


  return (
    <div>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div>
        {PostElement}
      </div>
    </div>
  );
}}

let AddNewPostForm=(props)=>{

  return <Form onSubmit={props.handleSubmit}>
   
   <Field component={Textarea} name="newPostText" validate={[required,maxLength10]}/>  
  <button>New Post</button>
  </Form>
}

const AddNewPostFormRedux=reduxForm({form:'ProfileaddNewPostForm'})(AddNewPostForm)

export default ALLPosts;

























// в реакт мы никогда не обращаемся к DOM напрямую через документбайайди и прочие ивентлисенеры
//работать нужно только с VirtualDom
/* <button onClick={()=>alert('hi')}>New Post</button>  */
/*  onClick можно на любой элемент(и на див и на текстареа и тд) */
