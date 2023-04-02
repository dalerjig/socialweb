import { combineReducers, configureStore,createStore } from "@reduxjs/toolkit";
import contentReducer from "./content-reducer";
import dialogsReducer from "./dialogs-reducer";
//let store = createStore()-устарел

let rootReducer = combineReducers({
    profilePage: contentReducer,
    dialogPage: dialogsReducer
})

let store = configureStore({reducer:rootReducer})
export default store;
//миддлвар подключать НЕ НУЖНО, он идёт вместе с конфигурстор

// let sum=(a=1,b=0)=>{
//     return a+b
// } по а и б по умолчанию равны 1,0 соответственно
window.sstateee = store