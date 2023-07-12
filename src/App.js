
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import WeatherColumn from './Components//WeatherColumn/WeatherColumn';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import UsersContainer from './Components/Users/UsersContainer';
import ContentContainer from './Components/Content/ContentContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import LoginPage from './Components/Login/Login';//тк по дефолту експорт, можем тут дать другое называние
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initialaizeAppThunk} from './Redux/app-reducer';
import Preloader from './Components/common/Preloader/Preloader';

export function withRouter(Children){
  return (props)=>{

     const match  = {params: useParams()};
     return <Children {...props}  match = {match}/>
 }
}

class App extends React.Component { //теперь апп-тег <App/>

  componentDidMount() {
    this.props.initialaizeAppThunk()
  }

  render() {
    if(!this.props.initialized){return <Preloader/>}
    

    return <BrowserRouter>
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


          <Route path='/users/' element={<UsersContainer />} />

          <Route path='/login/' element={<LoginPage />} />
        </Routes>




      </div >
    </BrowserRouter>
  }

}


const mapStateToProps=(state)=>({
  initialized:state.app.initialized
})

export default compose(withRouter, connect(mapStateToProps,{initialaizeAppThunk}))(App) ;

