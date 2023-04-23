
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import WeatherColumn from './Components//WeatherColumn/WeatherColumn';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import UsersContainer from './Components/Users/UsersContainer';
import ContentContainer from './Components/Content/ContentContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import LoginPage from './Components/Login/Login';//тк по дефолту експорт, можем тут дать другое называние

const App = (props) => { //теперь апп-тег <App/>

  return ( //только 1 div
    <BrowserRouter>
      <div className='MainStylyy'>
        <HeaderContainer />
        <NavBar />
        <WeatherColumn />
        <Routes>
          <Route path='/masseges/*' element={<DialogsContainer />} />

          {/* :userId - падает в match.params как свойство с ключом равным id по которому кликнули
          объявим переменную userId в compDidMount и впишем в юрл в get() */}
          <Route path='/profile/:userId' element={<ContentContainer />} /> 

          {/* чтобы попадать просто на profile */}
          <Route path='/profile/' element={<ContentContainer />} /> 


          <Route path='/users/' element={<UsersContainer/>} />

          <Route path='/login/' element={<LoginPage/>} />
        </Routes>




      </div >
    </BrowserRouter>
  )

}


export default App;
// MessageData={props.AppState.dialogPage.MessageData}
//DialogData={props.AppState.dialogPage.DialogData}
//==>AppState={props.AppState.dialogPage}, но не забывать прописать детальный путь в компонентах на уровень ниже(.props.MessageData)