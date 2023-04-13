
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import WeatherColumn from './Components//WeatherColumn/WeatherColumn';
import Header from './Components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import UsersContainer from './Components/Users/UsersContainer';
import ContentContainer from './Components/Content/ContentContainer';

const App = (props) => { //теперь апп-тег <App/>

  return ( //только 1 div
    <BrowserRouter>
      <div className='MainStylyy'>
        <Header />
        <NavBar />
        <WeatherColumn />
        <Routes>
          <Route path='/masseges/*' element={<DialogsContainer />} />

          {/* :userId - падает в match.params как свойство с ключом равным id по которому кликнули
          объявим переменную userId в compDidMount и впишем в юрл в get() */}
          <Route path='/profile/:userId' element={<ContentContainer />} /> 

          {/* чтобы попадать просто на profile */}
          <Route path='/profile/' element={<ContentContainer />} /> 


          <Route path='/users' element={<UsersContainer/>} />
        </Routes>




      </div >
    </BrowserRouter>
  )

}


export default App;
// MessageData={props.AppState.dialogPage.MessageData}
//DialogData={props.AppState.dialogPage.DialogData}
//==>AppState={props.AppState.dialogPage}, но не забывать прописать детальный путь в компонентах на уровень ниже(.props.MessageData)