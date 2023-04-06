import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import State from './Redux/State'; в state импортируем ререндер,а сюда не импортируем стейт, чтобы не было цикличности
// ибо index js не является компонентной, сюда нужно именно импортировать без пропсов
import store from './Redux/redux-store'
import { Provider } from 'react-redux';



const root = ReactDOM.createRoot(document.getElementById('root'));


let rerenderEntireThree = () => {
  root.render(
    <Provider store={store}>
      <App/>
    </Provider>
  );
}


rerenderEntireThree();
// store.subscribe(() => {
//   rerenderEntireThree()
// }  убираем подписку на изменение стейта и рендер, так как connect сам имеет внутренний subscribe
//анонимная функция внутри вызывается при изменении стейта
// теперь перерисовывается только та компонента, которая меняет стейт!!!!!!!!

//стейт-объект.при изменении нам нужно создавать копию стейта, ибо
//оригинальный(начальный) не меняется, но мы можем поменять его создав копию стейта с новыми данными












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