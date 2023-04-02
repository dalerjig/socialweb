import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import State from './Redux/State'; в state импортируем ререндер,а сюда не импортируем стейт, чтобы не было цикличности
// ибо index js не является компонентной, сюда нужно именно импортировать без пропсов
import store from './Redux/redux-store'


const root = ReactDOM.createRoot(document.getElementById('root'));


let rerenderEntireThree = (state) => {
 
  root.render(
    <App AppState={state}
    //getState()вызываем, а AddPost не вызываем тут, а пробрасываем по пропсам
      // AddPost={store.AddPost.bind(store)}//биндим AddPost за объектом store иначе передастся по props неверно,
      // updateNewPostText={store.UpdateNewPostText.bind(store)}// то есть теперь this==store в getState, а не state. изначально this=window 
      dispatch={store.dispatch.bind(store)}
      store={store}
    />
  );
}


rerenderEntireThree(store.getState());

// store.subscribe(rerenderEntireThree)

store.subscribe(() => {
  let state = store.getState()
  rerenderEntireThree(state)
} 
)//анонимная функция внутри вызывается при изменении стейта














// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App AppState={State} AddPost={AddPost}/> 
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//* <App PostData={PostData} MessageData={MessageData} DialogData={DialogData}/> вот так было до state 