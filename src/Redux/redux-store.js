import { combineReducers, configureStore} from "@reduxjs/toolkit";
import contentReducer from "./content-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./user-reducer";
import authReducer from "./aurth-reducer";
import {reducer as formReducer} from 'redux-form'

//let store = createStore()-устарел

let rootReducer = combineReducers({
    profilePage: contentReducer,
    dialogPage: dialogsReducer,
    usersPage:usersReducer,
    auth:authReducer,
    form:formReducer//form -забитое слово для redux form
    //для удобства гляди в консоль storee.getState().form
})

let store = configureStore({reducer:rootReducer})
export default store;
//applyMiddleWare() подключать НЕ НУЖНО, он идёт вместе с конфигурстор

// let sum=(a=1,b=0)=>{
//     return a+b
// } по а и б по умолчанию равны 1,0 соответственно
window.storee = store