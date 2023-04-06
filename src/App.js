
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import WeatherColumn from './Components//WeatherColumn/WeatherColumn';
import Content from './Components/Content/Content';
import Header from './Components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import UsersContainer from './Components/Users/UsersContainer';


const App = (props) => { //теперь апп-тег <App/>

  return ( //только 1 div
    <BrowserRouter>
      <div className='MainStylyy'>
        <Header />
        <NavBar />
        <WeatherColumn />
        <Routes>
          <Route path='/masseges/*' element={<DialogsContainer 
          //store={props.store} благодаря провайдеру стор виден в контейнере, т.е только там где он используется
          />} />
          <Route path='/profile' element={<Content
          // store={props.store}
          />}/>
          <Route path='/users' element={<UsersContainer
           //store={props.store}
          />}/>
        </Routes>




      </div >
    </BrowserRouter>
  )

}


export default App;
// MessageData={props.AppState.dialogPage.MessageData}
//DialogData={props.AppState.dialogPage.DialogData}
//==>AppState={props.AppState.dialogPage}, но не забывать прописать детальный путь в компонентах на уровень ниже(.props.MessageData)